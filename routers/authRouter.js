const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

const userControlls = require('../controllers/userController');
const {authenticateGoogle, authenticateFacebook} = require('../middlewares/passportService');
const {hostURL, clientURL} = require("../config/config");

authRouter.post('/auth/signin', (req,res,next) =>{
   
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
    })(req,res,next);
        

});

authRouter.post('/auth/signup', async (req,res,next) =>{
    try {
        let newUser = req.body;
        const result = await userControlls.register(newUser);
        //console.log(result);
        res.send(result);
    
    } catch (error) {
        return next(error);
    }
});

authRouter.get("/auth/facebook", authenticateFacebook, async (req,res,next)=>{

})

authRouter.post('/auth/facebook', async (req,res,next)=>{

});

authRouter.get("/auth/facebook/callback", async (req,res,next)=>{
    passport.authenticate('facebook',{session: false}, (error,userAuth, info) =>{    
        if (error || !userAuth) { 
            
            return res.redirect(`${clientURL}/#/auth/signin`);
        }
        else{
            req.login(userAuth, (error)=>{
                if (error)
                {
                    return res.redirect(`${hostURL}/#/auth/signin`);
                }
                const token = jwt.sign({userAuth}, SECRET_KEY, { expiresIn: '4h' });
                res.cookie("jwt-token", token);
                // return token to client
                return res.redirect(`${clientURL}/#/auth/signin`);
            });
        }
    })(req,res,next);

})

authRouter.get('/auth/google', authenticateGoogle, async (req,res,next)=>{

});

authRouter.post('/auth/google', async (req,res,next)=>{

});

authRouter.get('/auth/google/callback', async (req,res,next)=>{
    passport.authenticate('google',{session: false,}, (error,userAuth, info) =>{    
        if (error || !userAuth) { 
            
            return res.redirect(`${clientURL}/#/auth/signin`);
        }
        else{
            req.login(userAuth, (error)=>{
                if (error)
                {
                    return res.redirect(`${hostURL}/#/auth/signin`);
                }
                const token = jwt.sign({userAuth}, SECRET_KEY, { expiresIn: '4h' });
                res.cookie("jwt-token", token);
                // return token to client
                return res.redirect(`${clientURL}/#/auth/signin`);
            });
        }
    })(req,res,next);
});

module.exports = authRouter;