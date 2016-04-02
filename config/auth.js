// config/auth.js

// expose our config directly to our application using module.exports

module.exports = {
  'facebookAuth' : {
    // facebook calls it an App ID (tutorial must be out of date)
    'clientID' : '1556173104675542',
    // facebook calls it an App Secret (tutorial must be out of date)
    'clientSecret' : '9481991a0270cc6a904969453a2ef07b',
    'callbackURL' : 'http://localhost:8080/api/auth/facebook/callback'
  }
};
