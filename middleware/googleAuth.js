const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require("fs");
const path = require("path");

// Cargar el JSON secreto
const keysPath = path.join(__dirname, "../config/cliente.json");
const keys = JSON.parse(fs.readFileSync(keysPath));

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.web.client_id,
      clientSecret: keys.web.client_secret,
      callbackURL: keys.web.redirect_uris[0]
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Usuario Google:", profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;