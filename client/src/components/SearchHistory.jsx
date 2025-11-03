import React from 'react';
import { Search, Calendar, Clock } from 'lucide-react';

const SearchHistory = ({ history, onSearchClick }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No search history</h3>
          <p className="text-gray-500">
            Your search history will appear here after you start searching for images
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Search History</h2>
        <p className="text-sm text-gray-600 mt-1">
          Your recent searches - click to search again
        </p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {history.map((item) => (
          <button
            key={item._id}
            onClick={() => onSearchClick(item.term)}
            className="w-full text-left p-6 hover:bg-gray-50 transition duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition duration-300">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">{item.term}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition duration-300">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;