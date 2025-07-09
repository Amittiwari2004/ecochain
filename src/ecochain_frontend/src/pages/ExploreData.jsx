import React, { useState, useEffect } from 'react';
import { getValidatedData } from '../services/data';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  User, 
  TrendingUp,
  Eye,
  Download,
  BarChart3,
  Grid,
  List,
  ChevronDown
} from 'lucide-react';

const ExploreData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedType, selectedLocation, data, sortBy]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getValidatedData();
      // Mock data for demonstration
      const mockData = [
        {
          id: 1,
          type: 'Air Quality',
          value: 'Good',
          location: 'New York City',
          date: '2024-07-15',
          contributor: 'Olivia Bennett',
          status: 'Validated',
          details: 'PM2.5 levels measured at 12 µg/m³'
        },
        {
          id: 2,
          type: 'Water Quality',
          value: 'Excellent',
          location: 'Los Angeles',
          date: '2024-07-14',
          contributor: 'Ethan Carter',
          status: 'Validated',
          details: 'pH levels at 7.2, dissolved oxygen at 8.5 mg/L'
        },
        {
          id: 3,
          type: 'Soil Health',
          value: 'Moderate',
          location: 'Chicago',
          date: '2024-07-13',
          contributor: 'Sophia Davis',
          status: 'Validated',
          details: 'Organic matter content at 3.2%'
        },
        {
          id: 4,
          type: 'Biodiversity',
          value: 'High',
          location: 'San Francisco',
          date: '2024-07-12',
          contributor: 'Liam Foster',
          status: 'Validated',
          details: 'Species count: 45 different species observed'
        },
        {
          id: 5,
          type: 'Deforestation',
          value: 'Low',
          location: 'Seattle',
          date: '2024-07-11',
          contributor: 'Ava Green',
          status: 'Validated',
          details: 'Forest coverage maintained at 78%'
        }
      ];
      setData(mockData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = [...data];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contributor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Location filter
    if (selectedLocation !== 'All') {
      filtered = filtered.filter(item => item.location === selectedLocation);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  };

  const getValueColor = (value) => {
    switch (value.toLowerCase()) {
      case 'excellent':
      case 'good':
      case 'high':
        return 'text-green-400 bg-green-400/20';
      case 'moderate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'low':
      case 'poor':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const uniqueTypes = [...new Set(data.map(item => item.type))];
  const uniqueLocations = [...new Set(data.map(item => item.location))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Data</h1>
        <p className="text-gray-300">Filter and view environmental data contributed by the community.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="date">Date</option>
                  <option value="type">Type</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data View */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Contributor</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{item.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getValueColor(item.value)}`}>
                        {item.value}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{item.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{item.contributor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredData.map((item) => (
              <div key={item.id} className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-green-500/50 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{item.type}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getValueColor(item.value)}`}>
                    {item.value}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{item.contributor}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <p className="text-sm text-gray-400">{item.details}</p>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Eye className="w-5 h-5 inline mr-2" />
            Map View
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Download className="w-5 h-5 inline mr-2" />
            Export
          </button>
        </div>
        
        <div className="text-sm text-gray-400">
          Showing {filteredData.length} of {data.length} entries
        </div>
      </div>
    </div>
  );
};

export default ExploreData;