// Mock property data for development
const mockProperties = [
  {
    id: 'rec1',
    title: '渋谷駅徒歩3分 居抜き物件',
    area: '渋谷区',
    rent: 35,
    rentDisplay: '35万円',
    size: '25坪',
    type: '居抜き物件',
    description: '渋谷駅から徒歩3分の好立地にある居抜き物件です。カフェ・レストラン営業に最適な設備が整っています。',
    features: ['駅近', '居抜き', '人通り多', '角地'],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
    ],
    address: '東京都渋谷区道玄坂1-1-1',
    nearestStation: '渋谷',
    line: 'JR山手線',
    walkingDistance: '徒歩3分',
    walkingMinutes: 3,
    floor: '1階',
    buildingAge: '築15年',
    deposit: '敷金2ヶ月',
    keyMoney: '礼金1ヶ月',
    managementFee: '管理費5万円',
    businessHours: '制限なし',
    parking: 'なし',
    equipment: 'カウンター、厨房設備、エアコン',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-15T10:00:00.000Z',
    featured: true,
    status: 'available'
  },
  {
    id: 'rec2',
    title: '新宿南口 路面店舗',
    area: '新宿区',
    rent: 28,
    rentDisplay: '28万円',
    size: '20坪',
    type: '路面店',
    description: '新宿南口から徒歩5分の路面店舗です。視認性が高く集客に有利な立地です。',
    features: ['路面店', '角地', '視認性良', '駅近'],
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    address: '東京都新宿区新宿3-1-1',
    nearestStation: '新宿',
    line: 'JR山手線',
    walkingDistance: '徒歩5分',
    walkingMinutes: 5,
    floor: '1階',
    buildingAge: '築10年',
    deposit: '敷金3ヶ月',
    keyMoney: '礼金2ヶ月',
    managementFee: '管理費3万円',
    businessHours: '制限なし',
    parking: '1台',
    equipment: 'スケルトン',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-14T10:00:00.000Z',
    featured: true,
    status: 'available'
  },
  {
    id: 'rec3',
    title: '港区赤坂 高級立地',
    area: '港区',
    rent: 45,
    rentDisplay: '45万円',
    size: '30坪',
    type: '居抜き物件',
    description: '港区赤坂の高級エリアに位置する居抜き物件。高級レストランに最適です。',
    features: ['高級立地', '居抜き', 'テラス席', '個室あり'],
    images: [
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2127&q=80',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    address: '東京都港区赤坂1-1-1',
    nearestStation: '赤坂',
    line: '東京メトロ千代田線',
    walkingDistance: '徒歩2分',
    walkingMinutes: 2,
    floor: '2階',
    buildingAge: '築8年',
    deposit: '敷金4ヶ月',
    keyMoney: '礼金2ヶ月',
    managementFee: '管理費8万円',
    businessHours: '22時まで',
    parking: '2台',
    equipment: 'フル装備厨房、個室設備',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-13T10:00:00.000Z',
    featured: true,
    status: 'available'
  },
  {
    id: 'rec4',
    title: '千代田区丸の内 オフィス街',
    area: '千代田区',
    rent: 38,
    rentDisplay: '38万円',
    size: '22坪',
    type: 'スケルトン',
    description: '丸の内のオフィス街に位置するスケルトン物件。ランチ需要が高いエリアです。',
    features: ['オフィス街', 'スケルトン', 'ランチ需要', '平日集客'],
    images: [
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    address: '東京都千代田区丸の内1-1-1',
    nearestStation: '東京',
    line: 'JR山手線',
    walkingDistance: '徒歩3分',
    walkingMinutes: 3,
    floor: 'B1階',
    buildingAge: '築5年',
    deposit: '敷金3ヶ月',
    keyMoney: '礼金1ヶ月',
    managementFee: '管理費6万円',
    businessHours: '平日のみ',
    parking: 'なし',
    equipment: 'スケルトン',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-12T10:00:00.000Z',
    featured: true,
    status: 'available'
  },
  {
    id: 'rec5',
    title: '中央区銀座 一等地',
    area: '中央区',
    rent: 65,
    rentDisplay: '65万円',
    size: '35坪',
    type: '居抜き物件',
    description: '銀座の一等地に位置する居抜き物件。最高級の立地での営業が可能です。',
    features: ['一等地', '居抜き', '高級', '観光客多'],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    address: '東京都中央区銀座4-1-1',
    nearestStation: '銀座',
    line: '東京メトロ銀座線',
    walkingDistance: '徒歩1分',
    walkingMinutes: 1,
    floor: '1階',
    buildingAge: '築12年',
    deposit: '敷金6ヶ月',
    keyMoney: '礼金3ヶ月',
    managementFee: '管理費12万円',
    businessHours: '制限なし',
    parking: 'なし',
    equipment: 'フル装備厨房、バーカウンター',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-11T10:00:00.000Z',
    featured: false,
    status: 'available'
  },
  {
    id: 'rec6',
    title: '品川区大崎 駅前立地',
    area: '品川区',
    rent: 32,
    rentDisplay: '32万円',
    size: '28坪',
    type: '路面店',
    description: '大崎駅前の好立地にある路面店舗。通勤客の利用が見込めます。',
    features: ['駅前', '路面店', '通勤客多', '夜営業可'],
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    address: '東京都品川区大崎1-1-1',
    nearestStation: '大崎',
    line: 'JR山手線',
    walkingDistance: '徒歩1分',
    walkingMinutes: 1,
    floor: '1階',
    buildingAge: '築18年',
    deposit: '敷金2ヶ月',
    keyMoney: '礼金1ヶ月',
    managementFee: '管理費4万円',
    businessHours: '24時間可',
    parking: '3台',
    equipment: 'カウンター、基本厨房設備',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-10T10:00:00.000Z',
    featured: false,
    status: 'available'
  },
  {
    id: 'rec7',
    title: '目黒駅徒歩2分 カフェ居抜き',
    area: '品川区',
    rent: 26,
    rentDisplay: '26万円',
    size: '18坪',
    type: '居抜き物件',
    description: '目黒駅から徒歩2分のカフェ居抜き物件。おしゃれなエリアで若い女性客が多い立地です。',
    features: ['駅近', '居抜き', 'カフェ設備', 'おしゃれエリア'],
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2047&q=80'
    ],
    address: '東京都品川区上大崎2-1-1',
    nearestStation: '目黒',
    line: 'JR山手線',
    walkingDistance: '徒歩2分',
    walkingMinutes: 2,
    floor: '1階',
    buildingAge: '築20年',
    deposit: '敷金2ヶ月',
    keyMoney: '礼金1ヶ月',
    managementFee: '管理費3万円',
    businessHours: '制限なし',
    parking: 'なし',
    equipment: 'エスプレッソマシン、カウンター、テーブル席',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-09T10:00:00.000Z',
    featured: false,
    status: 'available'
  },
  {
    id: 'rec8',
    title: '恵比寿 ビル内レストラン',
    area: '渋谷区',
    rent: 42,
    rentDisplay: '42万円',
    size: '32坪',
    type: 'ビル内店舗',
    description: '恵比寿駅徒歩4分のビル内レストラン物件。落ち着いた雰囲気でディナー営業に最適。',
    features: ['ビル内', '落ち着き', 'ディナー向け', '個室対応可'],
    images: [
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2135&q=80',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2127&q=80'
    ],
    address: '東京都渋谷区恵比寿1-1-1',
    nearestStation: '恵比寿',
    line: 'JR山手線',
    walkingDistance: '徒歩4分',
    walkingMinutes: 4,
    floor: '3階',
    buildingAge: '築7年',
    deposit: '敷金3ヶ月',
    keyMoney: '礼金2ヶ月',
    managementFee: '管理費7万円',
    businessHours: '23時まで',
    parking: '1台',
    equipment: 'フル装備厨房、個室2室、バーカウンター',
    contactCompany: '株式会社i-tenpo',
    contactPhone: '03-1234-5678',
    contactEmail: 'info@i-tenpo.com',
    createdTime: '2024-01-08T10:00:00.000Z',
    featured: false,
    status: 'available'
  }
];

// Mock API client that simulates Airtable behavior
class MockDataClient {
  constructor() {
    this.properties = mockProperties;
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all properties
  async getProperties(params = {}) {
    await this.delay();
    let filteredProperties = [...this.properties];

    // Apply filterByFormula (simplified)
    if (params.filterByFormula) {
      if (params.filterByFormula.includes('Featured')) {
        filteredProperties = filteredProperties.filter(p => p.featured);
      }
    }

    // Apply maxRecords
    if (params.maxRecords) {
      filteredProperties = filteredProperties.slice(0, params.maxRecords);
    }

    // Apply sorting (simplified)
    if (params.sort) {
      try {
        const sortConfig = JSON.parse(params.sort);
        if (sortConfig && sortConfig.length > 0) {
          const { field, direction } = sortConfig[0];
          filteredProperties.sort((a, b) => {
            let aVal = a[field] || a.createdTime;
            let bVal = b[field] || b.createdTime;

            if (field === 'CreatedTime' || field === 'createdTime') {
              aVal = new Date(aVal);
              bVal = new Date(bVal);
            }

            if (direction === 'desc') {
              return bVal > aVal ? 1 : -1;
            } else {
              return aVal > bVal ? 1 : -1;
            }
          });
        }
      } catch (e) {
        console.warn('Sort parsing failed:', e);
      }
    }

    return filteredProperties;
  }

  // Get property by ID
  async getPropertyById(recordId) {
    await this.delay();
    const property = this.properties.find(p => p.id === recordId);
    if (!property) {
      throw new Error('Property not found');
    }
    return property;
  }

  // Search properties with filters
  async searchProperties(filters = {}) {
    await this.delay();
    let filteredProperties = [...this.properties];

    // Apply area filter
    if (filters.area) {
      filteredProperties = filteredProperties.filter(p =>
        p.area === filters.area
      );
    }

    // Apply property type filter
    if (filters.propertyType) {
      filteredProperties = filteredProperties.filter(p =>
        p.type === filters.propertyType
      );
    }

    // Apply station filter
    if (filters.station) {
      filteredProperties = filteredProperties.filter(p =>
        p.nearestStation === filters.station
      );
    }

    // Apply line filter
    if (filters.line) {
      filteredProperties = filteredProperties.filter(p =>
        p.line === filters.line
      );
    }

    // Apply walking distance filter
    if (filters.walkingDistance) {
      const minutes = parseInt(filters.walkingDistance.replace(/[^\d]/g, ''));
      if (minutes) {
        filteredProperties = filteredProperties.filter(p =>
          p.walkingMinutes <= minutes
        );
      }
    }

    // Apply price range filters
    if (filters.minRent) {
      filteredProperties = filteredProperties.filter(p =>
        p.rent >= filters.minRent
      );
    }
    if (filters.maxRent) {
      filteredProperties = filteredProperties.filter(p =>
        p.rent <= filters.maxRent
      );
    }

    // Apply keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredProperties = filteredProperties.filter(p =>
        p.title.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        p.area.toLowerCase().includes(keyword) ||
        p.address.toLowerCase().includes(keyword) ||
        p.nearestStation.toLowerCase().includes(keyword)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredProperties.sort((a, b) => {
        let aVal = a[filters.sortBy];
        let bVal = b[filters.sortBy];

        if (filters.sortBy === 'CreatedTime' || filters.sortBy === 'createdTime') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }

        if (filters.sortDirection === 'desc') {
          return bVal > aVal ? 1 : -1;
        } else {
          return aVal > bVal ? 1 : -1;
        }
      });
    }

    return filteredProperties;
  }

  // Get unique stations and lines from properties
  async getStationsAndLines() {
    await this.delay();
    const stationsSet = new Set();
    const linesSet = new Set();

    this.properties.forEach(property => {
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
  }
}

// Export singleton instance
export default new MockDataClient();