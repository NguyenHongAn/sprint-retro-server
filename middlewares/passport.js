const LocalStrategy  = require('passport-local').Strategy;
const passport = require('passport');

const passportJWT = require("passport-jwt");
const JWTStrategy  = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;  
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;


const userModel = require('../models/userModel');
const handleError = require('../utils/handleError');
const SECRET_KEY = process.env.SECRET_KEY;
const config = require('../config/config');
const { hashPassword, comparePassword} = require('../utils/bcryptFunc');

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


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
    else if (!comparePassword(password,user.password))
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

passport.use('google', new GoogleStrategy(
    {
        clientID        : config.googleAuth.clientID,
        clientSecret    : config.googleAuth.clientSecret,
        callbackURL     : config.googleAuth.callbackURL,
    },async (accessToken, refreshToken, profile, cb) =>{
        //B1: cerate new User, based on user's info from google
        const user = new userModel({
            username: profile.displayName,
            email: profile._json.email,
            googleProvider:{
                id: profile.id,
            },
            password: hashPassword(profile.id),
        });
      
        //B2: Create user if email not exist
        const [result,error] = await handleError( userModel.findOne({email: user.email }));
        if (error)
        {
            return cb(error);
        }
        else if (!result){
            const newUser = await user.save();
            return cb(null, newUser);
        }
        //B3: else return user 
        return cb(null, result);
    })
)

//prevent auto login of facebook 
//REF: https://stackoverflow.com/questions/12873960/passport-js-facebook-strategy-logout-issue


passport.use('facebook', new FacebookStrategy(
    {
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
        profileFields: config.facebookAuth.profileFields,
    },async (accessToken, refreshToken, profile, cb) =>{
        
        //B1: cerate new User, based on user's info from facebook
        const user = new userModel({
            username: profile.displayName,
            email: profile.emails[0].value,
            facebookProvider:{
                id: profile.id,
            },
            password: hashPassword(profile._json.id),
        });
        console.log(user);
        //B2: Create user if email not exist
        const [result,error] = await handleError( userModel.findOne({email: user.email }));
        if (error)
        {
            return cb(error);
        }
        
        else if (!result){
            const newUser = await user.save();
            return cb(null, newUser);
        }

        //B3: else return user 
        return cb(null, result);
    }
))