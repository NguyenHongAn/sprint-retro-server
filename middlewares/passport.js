const LocalStrategy  = require('passport-local').Strategy;

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = (passport) => {   
    passport.serializeUser((user,done) => {       
        done(null,user._id);
    });

    passport.deserializeUser(async (id,done) =>{
        const user = await (await userModel.findById(id)).exec((error) => {
            if (error) {console.log(error)}
        });
        done(err,user);
    });

    passport.use(
        new LocalStrategy(
            async (username, password, done)=> {
        //error handling
        let result = await userModel.findOne({username: username});
        console.log(result);
        if (!result)
        {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        else if (!bcrypt.compareSync(password,result.password))
        {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null,user);

    })
    )
}
