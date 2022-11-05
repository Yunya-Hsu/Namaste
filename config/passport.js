const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const argon2 = require('argon2')
const User = require('../models/user_model')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const theUser = await User.findUserByEmail(email)

      if (!theUser || !await argon2.verify(theUser.password, password)) {
        return done(null, false, req.flash('errorMessage', 'Email or password incorrect'))
      }

      delete theUser.password
      return done(null, theUser)
    } catch (err) {
      return done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const theUser = await User.deserializeUserInfo(id)
    done(null, theUser)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport
