// Airtable API Configuration
const AIRTABLE_BASE_ID = 'app3AZO4jZhAnBI7u'; // Your Base ID
const AIRTABLE_API_KEY = 'pat9FvEK6xByurTgb.bd23124981bf55976e54b92ceb1fbc88b2d1187dd17e7afdc8248c07da6cb6b8'; // Your API Key
const AIRTABLE_TABLE_NAME = 'Properties'; // テーブル名（正確に）
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

// Airtable API client
class AirtableClient {
  constructor() {
    this.baseUrl = AIRTABLE_API_URL;
    this.headers = {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    };
  }

  // Test connection
  async testConnection() {
    try {
      console.log('Testing Airtable connection...');
      console.log('Base URL:', this.baseUrl);
      console.log('API Key:', AIRTABLE_API_KEY ? 'Set' : 'Missing');
      
      const response = await fetch(`${this.baseUrl}?maxRecords=1`, {
        headers: this.headers
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Airtable error response:', errorText);
        throw new Error(`Airtable API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Connection successful! Records found:', data.records?.length || 0);
      
      // Log sample image data for debugging
      if (data.records && data.records.length > 0) {
        const sampleRecord = data.records[0];
        console.log('Sample record structure:', sampleRecord);
        if (sampleRecord.fields.Images) {
          console.log('Sample images data:', sampleRecord.fields.Images);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  }

  // Get all properties
  async getProperties(params = {}) {
    try {
      const queryParams = new URLSearchParams(params);
      const response = await fetch(`${this.baseUrl}?${queryParams}`, {
        headers: this.headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Airtable API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          url: this.baseUrl
        });
        throw new Error(`Airtable API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformRecords(data.records);
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }

  // Get property by ID
  async getPropertyById(recordId) {
    try {
      const response = await fetch(`${this.baseUrl}/${recordId}`, {
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformRecord(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  }

  // Get unique stations and lines from properties
  async getStationsAndLines() {
    try {
      const properties = await this.getProperties();
      const stationsSet = new Set();
      const linesSet = new Set();

      properties.forEach(property => {
        if (property.nearestStation) {
          stationsSet.add(property.nearestStation);
        }
        if (property.line) {
          linesSet.add(property.line);
        }
      });

      return {
        stations: Array.from(stationsSet).sort(),
        lines: Array.from(linesSet).sort()
      };
    } catch (error) {
      console.error('Error fetching stations and lines:', error);
      throw error;
    }
  }

  // Search properties with filters
  async searchProperties(filters = {}) {
    const params = {};

    // Build filter formula
    const filterConditions = [];

    if (filters.area) {
      filterConditions.push(`{Area}='${filters.area}'`);
    }

    if (filters.propertyType) {
      filterConditions.push(`{PropertyType}='${filters.propertyType}'`);
    }

    if (filters.station) {
      filterConditions.push(`{NearestStation}='${filters.station}'`);
    }

    if (filters.line) {
      filterConditions.push(`{Line}='${filters.line}'`);
    }

    if (filters.walkingDistance) {
      // Convert walking distance to minutes for comparison
      const minutes = parseInt(filters.walkingDistance.replace(/[^\d]/g, ''));
      if (minutes) {
        filterConditions.push(`{WalkingMinutes}<=${minutes}`);
      }
    }

    if (filters.minRent) {
      filterConditions.push(`{Rent}>=${filters.minRent}`);
    }

    if (filters.maxRent) {
      filterConditions.push(`{Rent}<=${filters.maxRent}`);
    }

    if (filters.keyword) {
      filterConditions.push(`OR(
        FIND(LOWER('${filters.keyword}'), LOWER({Title})) > 0,
        FIND(LOWER('${filters.keyword}'), LOWER({Description})) > 0,
        FIND(LOWER('${filters.keyword}'), LOWER({Address})) > 0,
        FIND(LOWER('${filters.keyword}'), LOWER({Area})) > 0,
        FIND(LOWER('${filters.keyword}'), LOWER({NearestStation})) > 0,
        FIND(LOWER('${filters.keyword}'), LOWER({Line})) > 0
      )`);
    }

    if (filterConditions.length > 0) {
      params.filterByFormula = `AND(${filterConditions.join(',')})`;
    }

    // Sorting
    if (filters.sortBy) {
      let sortField = filters.sortBy;
      // Map our sort fields to Airtable fields
      if (filters.sortBy === 'CreatedTime') {
        sortField = 'Created Time';
      } else if (filters.sortBy === 'Rent') {
        sortField = 'Rent';
      } else if (filters.sortBy === 'WalkingMinutes') {
        sortField = 'WalkingMinutes';
      }

      params.sort = JSON.stringify([{
        field: sortField,
        direction: filters.sortDirection || 'desc'
      }]);
    } else {
      // Default sort by creation time
      params.sort = JSON.stringify([{
        field: 'Created Time',
        direction: 'desc'
      }]);
    }

    return this.getProperties(params);
  }

  // Transform Airtable records to our property format
  transformRecords(records) {
    return records.map(record => this.transformRecord(record));
  }

  transformRecord(record) {
    const fields = record.fields;

    // Process images from Airtable attachments with enhanced error handling
    const images = [];
    
    console.log('Processing images for record:', record.id);
    console.log('Images field:', fields.Images);
    
    if (fields.Images && Array.isArray(fields.Images)) {
      fields.Images.forEach((attachment, index) => {
        console.log(`Image ${index}:`, attachment);
        
        if (attachment && attachment.url) {
          // Validate the URL
          try {
            new URL(attachment.url);
            images.push(attachment.url);
            console.log(`Added image URL: ${attachment.url}`);
          } catch (urlError) {
            console.warn(`Invalid image URL: ${attachment.url}`, urlError);
          }
        } else {
          console.warn('Invalid attachment structure:', attachment);
        }
      });
    } else if (fields.Images) {
      console.warn('Images field exists but is not an array:', typeof fields.Images, fields.Images);
    }

    // If no valid images found, use default
    if (images.length === 0) {
      console.log('No valid images found, using default');
      images.push('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    }

    console.log(`Final images array for ${record.id}:`, images);

    return {
      id: record.id,
      title: fields.Title || '',
      area: fields.Area || '',
      rent: fields.Rent || 0,
      rentDisplay: fields.RentDisplay || `${fields.Rent}万円`,
      size: fields.Size || '',
      type: fields.PropertyType || '',
      description: fields.Description || '',
      features: fields.Features ? fields.Features.split(',').map(f => f.trim()) : [],
      images: images,
      address: fields.Address || '',
      nearestStation: fields.NearestStation || '',
      line: fields.Line || '',
      walkingDistance: fields.WalkingDistance || '',
      walkingMinutes: fields.WalkingMinutes || null,
      floor: fields.Floor || '',
      buildingAge: fields.BuildingAge || '',
      deposit: fields.Deposit || '',
      keyMoney: fields.KeyMoney || '',
      managementFee: fields.ManagementFee || '',
      businessHours: fields.BusinessHours || '',
      parking: fields.Parking || '',
      equipment: fields.Equipment || '',
      contactCompany: fields.ContactCompany || '',
      contactPhone: fields.ContactPhone || '',
      contactEmail: fields.ContactEmail || '',
      createdTime: record.createdTime,
      featured: fields.Featured || false,
      status: fields.Status || 'available'
    };
  }
}

// Export singleton instance
export default new AirtableClient();