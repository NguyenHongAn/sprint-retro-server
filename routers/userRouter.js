const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

const userControlls = require('../controllers/userController');

userRouter.post('/auth/signin', (req,res,next) =>{
   
    passport.authenticate('local',{session: false}, function(err, userAuth, info){
        if (err || !userAuth) { 
            
            return res.status(400).json(info);
        }
        //console.log({userAuth});
        req.login(userAuth, {session: false}, (error) =>{
            if (error)
            {
                //console.log(error);
                res.sendStatus(403);
                
            }
            const token = jwt.sign({userAuth}, SECRET_KEY, { expiresIn: '4h' });

            //B4: return token to client
            return res.send({token});
        });
    })(req,res);
        

});

userRouter.post('/auth/signup', async (req,res,next) =>{
    try {
        let newUser = req.body;
        const result = await userControlls.register(newUser);
        //console.log(result);
        res.send(result);
    
    } catch (error) {
        return next(error);
    }
});



module.exports = userRouter;