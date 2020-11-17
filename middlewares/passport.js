const LocalStrategy  = require('passport-local').Strategy;
const passport = require('passport');

const passportJWT = require("passport-jwt");
const JWTStrategy  = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;  

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const handleError = require('../utils/handleError');
const SECRET_KEY = process.env.SECRET_KEY;


passport.use('local',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
        },
    async (username, password, done)=> {
    
    let [user, error] = await handleError(userModel.findOne({email: username}));
    
    if (error)
    {
        return done(error);
    }
    
    if (!user)
    {
        return done(null, false, { message: 'Incorrect email or password.' });
    }
    else if (!bcrypt.compareSync(password,user.password))
    {
        return done(null, false, { message: 'Incorrect email or password.' });
    }
    return done(null,user);

})
),

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey   : SECRET_KEY,
    },
    function (jwtPayload, done) {
        //console.log(jwtPayload);
        return done(null, jwtPayload);
    }
))

