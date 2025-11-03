
import axios from 'axios';
import SearchHistory from '../models/SearchHistory.js';

//Search images from Unsplash API
export const searchImages = async (req, res) => {
  try {
    const { term } = req.body;

    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    // Save search history
    await SearchHistory.create({
      userId: req.user._id,
      term: term.toLowerCase(),
    });

    // Fetch from Unsplash API
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term,
        per_page: 20,
        client_id: process.env.UNSPLASH_ACCESS_KEY,
      },
    });

    const images = response.data.results.map((img) => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description,
      photographer: img.user.name,
      photographerUrl: img.user.links.html,
    }));

    res.json(images);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching images' });
  }
};

// Get top 5 most searched terms
export const getTopSearches = async (req, res) => {
  try {
    const topSearches = await SearchHistory.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Top searches error:', error);
    res.status(500).json({ message: 'Error fetching top searches' });
  }
};
