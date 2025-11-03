
import SearchHistory from '../models/SearchHistory.js';

// Get the current user's search history
export const getUserSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20);

    res.json(history);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
};
