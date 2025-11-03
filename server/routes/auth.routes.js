
import express from 'express';
import passport from 'passport';
import {
  googleAuth,
  googleCallback,
  handleGoogleCallback,
  logoutUser,
  getCurrentUser,
  facebookAuth,
  facebookCallback,
  githubAuth,
  githubCallback
} from '../controllers/auth.controller.js';

const router = express.Router();

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, handleGoogleCallback);




// ===== Facebook =====
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookCallback);

// ===== GitHub =====
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);

// Logout route
router.get('/logout', logoutUser);

// Current user
router.get('/current', getCurrentUser);

export default router;
