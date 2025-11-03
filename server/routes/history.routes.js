
import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getUserSearchHistory } from '../controllers/history.controller.js';

const router = express.Router();

router.get('/history', requireAuth, getUserSearchHistory);

export default router;
