import airtableClient from './airtable.js';
import mockDataClient from './mockData.js';

// Configuration - set to false for safer deployment
const USE_AIRTABLE = false; // Changed to false for deployment safety

// Test Airtable connection (development only)
const testAirtableConnection = async () => {
  if (USE_AIRTABLE && process.env.NODE_ENV === 'development') {
    try {
      console.log('🔍 Testing Airtable connection...');
      await airtableClient.testConnection();
      console.log('✅ Airtable connection successful!');
    } catch (error) {
      console.error('❌ Airtable connection failed:', error.message);
      console.log('📝 Please check your API configuration in src/lib/airtable.js');
      console.log('🔄 Falling back to mock data for now...');
    }
  }
};

// Run connection test in development only
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  testAirtableConnection();
}

// Properties database operations with fallback to mock data
export const propertiesDB = {
  // Get all properties
  async getAll() {
    try {
      if (USE_AIRTABLE) {
        console.log('📡 Fetching properties from Airtable...');
        const properties = await airtableClient.getProperties();
        console.log(`📊 Fetched ${properties.length} properties from Airtable`);
        
        // Log image data for debugging
        properties.forEach(property => {
          if (property.images && property.images.length > 0) {
            console.log(`Property ${property.id} images:`, property.images);
          }
        });
        
        return properties.filter(property => property.status === 'available');
      } else {
        console.log('🔧 Using mock data - Airtable disabled');
        const properties = await mockDataClient.getProperties();
        return properties.filter(property => property.status === 'available');
      }
    } catch (error) {
      console.warn('⚠️ Falling back to mock data:', error.message);
      try {
        const properties = await mockDataClient.getProperties();
        return properties.filter(property => property.status === 'available');
      } catch (mockError) {
        console.error('❌ Mock data failed:', mockError);
        return []; // Return empty array instead of throwing
      }
    }
  },

  // Get featured properties
  async getFeatured() {
    try {
      if (USE_AIRTABLE) {
        console.log('📡 Fetching featured properties from Airtable...');
        const params = {
          filterByFormula: 'AND({Featured}=TRUE(), {Status}="available")',
          maxRecords: 4,
          sort: JSON.stringify([{field: 'Created Time', direction: 'desc'}])
        };
        const properties = await airtableClient.getProperties(params);
        console.log(`⭐ Fetched ${properties.length} featured properties from Airtable`);
        return properties;
      } else {
        console.log('🔧 Using mock data for featured properties');
        const params = {
          filterByFormula: 'Featured',
          maxRecords: 4
        };
        return await mockDataClient.getProperties(params);
      }
    } catch (error) {
      console.warn('⚠️ Using mock data for featured properties:', error.message);
      try {
        const params = {
          filterByFormula: 'Featured',
          maxRecords: 4
        };
        return await mockDataClient.getProperties(params);
      } catch (mockError) {
        console.error('❌ Mock data failed for featured:', mockError);
        return []; // Return empty array instead of throwing
      }
    }
  },

  // Get property by ID
  async getById(id) {
    try {
      if (USE_AIRTABLE) {
        console.log('📡 Fetching property by ID from Airtable...');
        const property = await airtableClient.getPropertyById(id);
        console.log(`🏠 Fetched property ${id} from Airtable, images:`, property.images);
        return property;
      } else {
        console.log('🔧 Using mock data for property by ID');
        return await mockDataClient.getPropertyById(id);
      }
    } catch (error) {
      console.warn('⚠️ Using mock data for property by ID:', error.message);
      try {
        return await mockDataClient.getPropertyById(id);
      } catch (mockError) {
        console.error('❌ Mock data failed for property by ID:', mockError);
        throw new Error('物件データの読み込みに失敗しました');
      }
    }
  },

  // Search properties with filters
  async search(filters = {}) {
    try {
      if (USE_AIRTABLE) {
        console.log('📡 Searching properties in Airtable...');
        const properties = await airtableClient.searchProperties(filters);
        console.log(`🔍 Search returned ${properties.length} properties from Airtable`);
        return properties;
      } else {
        console.log('🔧 Using mock data for search');
        return await mockDataClient.searchProperties(filters);
      }
    } catch (error) {
      console.warn('⚠️ Using mock data for search:', error.message);
      try {
        return await mockDataClient.searchProperties(filters);
      } catch (mockError) {
        console.error('❌ Mock data failed for search:', mockError);
        return []; // Return empty array instead of throwing
      }
    }
  }
};