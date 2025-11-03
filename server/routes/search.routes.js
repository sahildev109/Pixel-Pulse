
import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { searchImages, getTopSearches } from '../controllers/search.controller.js';

const router = express.Router();

router.post('/search', requireAuth, searchImages);
router.get('/top-searches', requireAuth, getTopSearches);

export default router;
