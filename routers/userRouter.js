const express = require('express');

const userRouter = express.Router();

userRouter.post('/auth/signin', async (req,res,next) =>{
    console.log(req.body);
    res.send("post sign in");
});

userRouter.post('/auth/signup', async (req,res,next) =>{
    console.log(req.body);
    res.send("post sign up");
});

module.exports = userRouter;