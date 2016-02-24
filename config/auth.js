// config/auth.js

// expose our config directly to our application using module.exports

module.exports = {
  'facebookAuth' : {
    // facebook calls it an App ID (tutorial must be out of date)
    'clientID' : '2012262935665028',
    // facebook calls it an App Secret (tutorial must be out of date)
    'clientSecret' : 'cf3e31afbd223a5094cba083657e0b47',
    'callbackURL' : 'http://localhost:8080/auth/facebook/callback'
  }
};
