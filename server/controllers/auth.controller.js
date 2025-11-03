import passport from 'passport';

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

export const googleCallback = passport.authenticate('google', {
  failureRedirect: `${process.env.CLIENT_URL}/login`
});

export const handleGoogleCallback = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};

export const facebookAuth = passport.authenticate('facebook', { scope: ['email'] });

export const facebookCallback = [
  passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => res.redirect(`${process.env.CLIENT_URL}/dashboard`)
];

export const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

export const githubCallback = [
  passport.authenticate('github', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => res.redirect(`${process.env.CLIENT_URL}/dashboard`)
];

export const logoutUser = (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  });
};

export const getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};
