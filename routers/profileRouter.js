const express= require('express');
const jwt = require('jsonwebtoken');

const profileRouter = express.Router();
let log = console.log;

const {authenticateJWT} = require("../middlewares/passportService");
const userControlls = require('../controllers/userController');
const SECRET_KEY = process.env.SECRET_KEY;

profileRouter.get("/profile", authenticateJWT, (req,res,next)=>{
    
    //get user info from jwt 
    console.log(req.user.userAuth);
    res.status(200).send(req.user.userAuth);
});

profileRouter.post("/profile", authenticateJWT, async (req,res,next) =>{
    
    //B1: get data from client
    const changedUser = req.body.user;
    const userID = req.user.userAuth._id;
    const isPasswordChange = req.body.isPassChange;
    const isEmailChange = req.body.isEmailChange;
    //B2: create new user from data 
    changedUser._id =  userID;
    //B2.1: check if user is change password
    if (isPasswordChange)
    {
        //B3.1:Check user input correct pass
        const isCorrect = await userControlls.checkPassword(userID,changedUser.password);
        log({isCorrect});
        //B3.2: update when password is correct, send error message if not
        if (isCorrect)
        {
            //change password file 
            const newUser = userControlls.changedUserInfo(changedUser);
            
            log(newUser);
            let isExists = false;
            
            if(isEmailChange)
            {
                isExists = await userControlls.checkEmailExists(changedUser.email);
            } 
             
            if (isExists === false)
            {
            //B3.3: Update user onfo to server 
            try {
                const result = await userControlls.updateUserInfo(newUser);
                //return new token to user
                const token = jwt.sign({userAuth: result}, SECRET_KEY, { expiresIn: '4h' });
                res.send({result, token});
                
            } catch (error) {
                res.send({message: "Can not change user's infomation"});   
            }
            }
        }
        else{
            res.send({message: "incorrect password"});
        }
    }
    //B4: if user do not change password
    else{
        try {
            //B4.1: changed password feild
            changedUser.newPassword = changedUser.password;
            
             //B 4.2: create password
            const newUser = userControlls.changedUserInfo(changedUser);
            
            delete newUser['password'];
            
            let isExists = false;
            
            if(isEmailChange)
            {
                isExists = await userControlls.checkEmailExists(changedUser.email);
            } 

            if (isExists === false)
            {
                const result = await userControlls.updateUserInfo(newUser);
            
                const token = jwt.sign({userAuth: result}, SECRET_KEY, { expiresIn: '4h' });
                log({result, token})
                res.send({result, token});
                
            }
            else
            {
                res.send({message: "Email is exists"});
            }
            
        } catch (error) {
            log(error);
            res.send({message: "Can not change user's infomation"});   
        }
    }

    //res.sendStatus(200);
});

module.exports = profileRouter;


