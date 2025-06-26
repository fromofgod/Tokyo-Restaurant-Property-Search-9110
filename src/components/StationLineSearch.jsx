import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import airtableClient from '../lib/airtable';

const { FiTrain, FiMapPin, FiSearch } = FiIcons;

const StationLineSearch = ({ onSearch, initialFilters = {} }) => {
  const [selectedLine, setSelectedLine] = useState(initialFilters.line || '');
  const [selectedStation, setSelectedStation] = useState(initialFilters.station || '');
  const [walkingDistance, setWalkingDistance] = useState(initialFilters.walkingDistance || '');
  const [stationsData, setStationsData] = useState({ stations: [], lines: [] });
  const [filteredStations, setFilteredStations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 東京の主要路線データ
  const tokyoLines = {
    'JR山手線': ['新宿', '渋谷', '原宿', '代々木', '新大久保', '高田馬場', '目白', '池袋', '大塚', '巣鴨', '駒込', '田端', '西日暮里', '日暮里', '鶯谷', '上野', '御徒町', '秋葉原', '神田', '東京', '有楽町', '新橋', '浜松町', '田町', '品川', '大崎', '五反田', '目黒', '恵比寿'],
    'JR中央線': ['東京', '神田', '御茶ノ水', '四ツ谷', '新宿', '代々木', '千駄ヶ谷', '信濃町', '四谷', '市ヶ谷'],
    'JR総武線': ['秋葉原', '浅草橋', '両国', '錦糸町', '亀戸', '平井'],
    '東京メトロ銀座線': ['浅草', '田原町', '稲荷町', '上野', '上野広小路', '末広町', '神田', '三越前', '日本橋', '京橋', '銀座', '新橋', '虎ノ門', '溜池山王', '赤坂見附', '青山一丁目', '外苑前', '表参道', '渋谷'],
    '東京メトロ丸ノ内線': ['池袋', '新大塚', '茗荷谷', '後楽園', '本郷三丁目', '御茶ノ水', '淡路町', '大手町', '東京', '銀座', '霞ヶ関', '国会議事堂前', '赤坂見附', '四ツ谷', '四谷三丁目', '新宿御苑前', '新宿三丁目', '新宿'],
    '東京メトロ日比谷線': ['北千住', '南千住', '三ノ輪', '入谷', '上野', '仲御徒町', '秋葉原', '小伝馬町', '人形町', '茅場町', '八丁堀', '築地', '東銀座', '銀座', '日比谷', '霞ヶ関', '神谷町', '六本木', '恵比寿', '中目黒'],
    '東京メトロ東西線': ['中野', '落合', '高田馬場', '早稲田', '神楽坂', '飯田橋', '九段下', '竹橋', '大手町', '日本橋', '門前仲町', '木場', '東陽町', '南砂町', '西葛西', '葛西'],
    '東京メトロ千代田線': ['代々木上原', '代々木公園', '明治神宮前', '表参道', '乃木坂', '赤坂', '国会議事堂前', '霞ヶ関', '日比谷', '二重橋前', '大手町', '新御茶ノ水', '湯島', '根津', '千駄木', '西日暮里'],
    '東京メトロ有楽町線': ['和光市', '地下鉄成増', '地下鉄赤塚', '平和台', '氷川台', '小竹向原', '千川', '要町', '池袋', '東池袋', '護国寺', '江戸川橋', '飯田橋', '市ヶ谷', '麹町', '永田町', '桜田門', '有楽町', '銀座一丁目', '新富町', '月島', '豊洲'],
    '東京メトロ半蔵門線': ['渋谷', '表参道', '青山一丁目', '永田町', '半蔵門', '九段下', '神保町', '大手町', '三越前', '水天宮前', '清澄白河', '住吉', '錦糸町', '押上'],
    '東京メトロ南北線': ['目黒', '白金高輪', '白金台', '麻布十番', '六本木一丁目', '溜池山王', '永田町', '四ツ谷', '市ヶ谷', '飯田橋', '後楽園', '東大前', '本駒込', '駒込', '西ヶ原', '王子', '王子神谷'],
    '都営浅草線': ['西馬込', '馬込', '中延', '戸越', '五反田', '高輪台', '泉岳寺', '三田', '大門', '新橋', '東銀座', '宝町', '日本橋', '人形町', '東日本橋', '浅草橋', '蔵前', '浅草', '本所吾妻橋', '押上'],
    '都営三田線': ['目黒', '白金台', '白金高輪', '三田', '芝公園', '御成門', '内幸町', '日比谷', '大手町', '神保町', '水道橋', '春日', '白山', '千石', '巣鴨', '西巣鴨'],
    '都営新宿線': ['新宿', '新宿三丁目', '曙橋', '市ヶ谷', '九段下', '神保町', '小川町', '岩本町', '馬喰横山', '浜町', '森下', '菊川', '住吉', '西大島', '大島'],
    '都営大江戸線': ['都庁前', '新宿西口', '東新宿', '若松河田', '牛込柳町', '牛込神楽坂', '飯田橋', '春日', '本郷三丁目', '上野御徒町', '新御徒町', '蔵前', '門前仲町', '月島', '勝どき', '築地市場', '汐留', '大門', '赤羽橋', '麻布十番', '六本木', '青山一丁目', '国立競技場']
  };

  useEffect(() => {
    const fetchStationsAndLines = async () => {
      try {
        setLoading(true);
        // Use predefined Tokyo lines data
        const lines = Object.keys(tokyoLines);
        const allStations = Object.values(tokyoLines).flat();
        const uniqueStations = [...new Set(allStations)].sort();

        setStationsData({
          lines: lines,
          stations: uniqueStations
        });

        if (selectedLine && tokyoLines[selectedLine]) {
          setFilteredStations(tokyoLines[selectedLine]);
        } else {
          setFilteredStations(uniqueStations);
        }
      } catch (error) {
        console.error('Error fetching stations and lines:', error);
        setStationsData({ lines: [], stations: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchStationsAndLines();
  }, []);

  useEffect(() => {
    if (selectedLine && tokyoLines[selectedLine]) {
      setFilteredStations(tokyoLines[selectedLine]);
      // Clear station selection if it's not on the selected line
      if (selectedStation && !tokyoLines[selectedLine].includes(selectedStation)) {
        setSelectedStation('');
      }
    } else {
      setFilteredStations(stationsData.stations);
    }
  }, [selectedLine, stationsData.stations]);

  const handleLineChange = (line) => {
    setSelectedLine(line);
    if (line && tokyoLines[line] && !tokyoLines[line].includes(selectedStation)) {
      setSelectedStation('');
    }
  };

  const handleSearch = () => {
    const searchFilters = {
      line: selectedLine,
      station: selectedStation,
      walkingDistance: walkingDistance
    };

    if (onSearch) {
      onSearch(searchFilters);
    }
  };

  const walkingDistanceOptions = [
    { value: '', label: '指定なし' },
    { value: '徒歩1分', label: '徒歩1分以内' },
    { value: '徒歩3分', label: '徒歩3分以内' },
    { value: '徒歩5分', label: '徒歩5分以内' },
    { value: '徒歩10分', label: '徒歩10分以内' }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <SafeIcon icon={FiTrain} className="w-6 h-6 text-red-600" />
        <span>沿線・駅から探す</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Line Selection */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <SafeIcon icon={FiTrain} className="w-4 h-4 text-red-500" />
            <span>路線</span>
          </label>
          <select
            value={selectedLine}
            onChange={(e) => handleLineChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">路線を選択</option>
            {stationsData.lines.map(line => (
              <option key={line} value={line}>{line}</option>
            ))}
          </select>
        </div>

        {/* Station Selection */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <SafeIcon icon={FiMapPin} className="w-4 h-4 text-red-500" />
            <span>駅</span>
          </label>
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            disabled={!filteredStations.length}
          >
            <option value="">駅を選択</option>
            {filteredStations.map(station => (
              <option key={station} value={station}>{station}</option>
            ))}
          </select>
        </div>

        {/* Walking Distance */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            徒歩距離
          </label>
          <select
            value={walkingDistance}
            onChange={(e) => setWalkingDistance(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {walkingDistanceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 opacity-0">
            検索
          </label>
          <button
            onClick={handleSearch}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            disabled={!selectedStation && !selectedLine}
          >
            <SafeIcon icon={FiSearch} className="w-4 h-4" />
            <span>検索</span>
          </button>
        </div>
      </div>

      {/* Selected Filters Display */}
      {(selectedLine || selectedStation || walkingDistance) && (
        <div className="border-t pt-4">
          <div className="flex flex-wrap gap-2">
            {selectedLine && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                路線: {selectedLine}
              </span>
            )}
            {selectedStation && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                駅: {selectedStation}
              </span>
            )}
            {walkingDistance && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {walkingDistance}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StationLineSearch;