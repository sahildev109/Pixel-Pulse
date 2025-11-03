import React from 'react';
import { Check, User, ExternalLink, Search } from 'lucide-react';

const ImageGrid = ({ images, selectedImages, onImageSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-500">
            Try searching for something else or check your search terms
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-gray-600">
          Found {images.length} image{images.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300"
          >
            {/* Checkbox Overlay */}
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() => onImageSelect(image.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-300 ${
                  selectedImages.has(image.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/90 text-gray-400 hover:bg-white hover:text-gray-600'
                }`}
              >
                <Check className="h-4 w-4" />
              </button>
            </div>

            {/* Image */}
            <div className="aspect-square overflow-hidden">
              <img
                src={image.url}
                alt={image.alt || 'Unsplash image'}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Image Info */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {image.photographer}
                  </span>
                </div>
                <a
                  href={image.photographerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Selection Overlay */}
            {selectedImages.has(image.id) && (
              <div className="absolute inset-0 border-2 border-blue-600 rounded-lg pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;   