const passport = require('passport');

module.exports = {
    authenticateJWT: passport.authenticate('jwt', { session: false }),
    authenticateCredentials: passport.authenticate('local', { session: false }),
};