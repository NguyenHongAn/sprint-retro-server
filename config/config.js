const hostURL = process.env.ENV === "develop" ? process.env.DEV_HOST : process.env.PRODUCT_HOST;
const clientURL = process.env.ENV === "develop" ? process.env.DEV_CLIENT_URL: process.env.PRO_CLIENT_URL;
module.exports = {
     facebookAuth : {
        clientID     : process.env.FACEBOOK_ID,
        clientSecret : process.env.FACEBOOK_SECRET,
        callbackURL  : `${hostURL}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'email'],
        passReqToCallback : true,
    },

    googleAuth: {
        clientID        : process.env.GOOGLE_ID,
        clientSecret    : process.env.GOOGLE_SECRET,
        callbackURL     : `${hostURL}/auth/google/callback`,
    },
    hostURL,
    clientURL,
};