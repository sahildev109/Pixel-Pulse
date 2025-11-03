import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import TopSearches from '../components/TopSearches';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';
import SearchHistory from '../components/SearchHistory';
import { LogOut, Search, History } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
 console.log(user)
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [searchHistory, setSearchHistory] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    fetchTopSearches();
    fetchSearchHistory();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await axios.get('/api/top-searches', { withCredentials: true });
      setTopSearches(response.data);
    } catch (error) {
      console.error('Error fetching top searches:', error);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get('/api/history', { withCredentials: true });
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/search', 
        { term: searchTerm },
        { withCredentials: true }
      );
      setSearchResults(response.data);
      setActiveTab('search');
      
      // Refresh history and top searches
      fetchSearchHistory();
      fetchTopSearches();
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching images');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleClearSelection = () => {
    setSelectedImages(new Set());
  };
const avatar=user.avatar
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-xl ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">PixelPulse</h1>
            </div>
            
            <div className="flex items-center space-x-4">
                <div>
              <div className="flex items-center space-x-2">
                { user.avatar && <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />}
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-lg hover:cursor-pointer transition duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
            
          </div>
        </div>
      </header>

      {/* Top Searches Banner */}
      <TopSearches topSearches={topSearches} onSearchClick={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} loading={loading} />

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('search')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'search'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Search Results</span>
                  {searchResults.length > 0 && (
                    <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {searchResults.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <History className="h-4 w-4" />
                  <span>Search History</span>
                </button>
              </nav>
            </div>

            {/* Multi-Select Counter */}
            {activeTab === 'search' && selectedImages.size > 0 && (
              <div className="mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-800 font-medium">
                    Selected: {selectedImages.size} image{selectedImages.size !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={handleClearSelection}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear Selection
                </button>
              </div>
            )}

            {/* Content based on active tab */}
            {activeTab === 'search' ? (
              <ImageGrid
                images={searchResults}
                selectedImages={selectedImages}
                onImageSelect={handleImageSelect}
                loading={loading}
              />
            ) : (
              <SearchHistory 
                history={searchHistory}
                onSearchClick={handleSearch}
              />
            )}
          </div>

          {/* Sidebar - Search History Preview */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <History className="h-5 w-5 mr-2" />
                Recent Searches
              </h3>
              <div className="space-y-3">
                {searchHistory.slice(0, 5).map((item, index) => (
                  <button
                    key={item._id}
                    onClick={() => handleSearch(item.term)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-900">{item.term}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
                {searchHistory.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No search history yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;