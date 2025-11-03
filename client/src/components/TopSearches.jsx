import React from 'react';
import { TrendingUp } from 'lucide-react';

const TopSearches = ({ topSearches, onSearchClick }) => {
  if (!topSearches || topSearches.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Trending Searches:</span>
            </div>
            <div className="flex items-center space-x-3">
              {topSearches.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => onSearchClick(item._id)}
                  className="text-sm hover:bg-white/20 px-3 py-1 rounded-full transition duration-300 flex items-center space-x-1"
                >
                  <span className="font-medium">#{index + 1}</span>
                  <span>{item._id}</span>
                  <span className="text-white/70 text-xs">({item.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSearches;