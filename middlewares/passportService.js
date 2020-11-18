const passport = require('passport');

module.exports = {
    authenticateJWT: passport.authenticate('jwt', { session: false }),
    authenticateGoogle: passport.authenticate('google',{ session: false,
                                                        prompt:"select_account",
                                                        scope:["profile", 'email']}),
    authenticateFacebook: passport.authenticate("facebook",{session: false,
                                                            prompt : "select_account"}),
    authenticateCredentials: passport.authenticate('local', { session: false }),
};