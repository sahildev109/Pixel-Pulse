import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(new GoogleStrategy({

  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id });
    
    if (!user) {
      user = await User.create({
        provider: 'google',
        providerId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));



// ===== Facebook Strategy =====
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id });

    if (!user) {
      user = await User.create({
        provider: 'facebook',
        providerId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        avatar: profile.photos?.[0]?.value || ''
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// ===== GitHub Strategy =====
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback",
   scope: ["user:email"]
}, async (accessToken, refreshToken, profile, done) => {
  try {

      let email = profile.emails?.[0]?.value;
      

        // If email is not public, fetch private/verified emails
        if (!email) {
          const { data: emails } = await axios.get("https://api.github.com/user/emails", {
            headers: { Authorization: `token ${accessToken}` },
          });

          const verifiedEmail = emails.find((e) => e.verified && e.primary);
          email = verifiedEmail ? verifiedEmail.email : null;
        }

        if (!email) {
          console.log("❌ No email found from GitHub");
          return done(null, false, { message: "No verified email found" });
        }

    let user = await User.findOne({ providerId: profile.id });

    if (!user) {
      user = await User.create({
        provider: 'github',
        providerId: profile.id,
        name: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value || '',
        avatar: profile.photos?.[0]?.value || ''
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));


// Add similar strategies for Facebook and GitHub
// (You can implement these similarly)

export default passport;