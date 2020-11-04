//package
const express = require('express');

//get module sprint controller


const homeRouter = express.Router();

homeRouter.get('/', async (req,res)=>{
  //res.status(200);
  res.send("Successfull connnect with server");

        // boards:[
        //     {
        //       userID: 1,
        //       title: "Something",
        //       createTime: new Date().toLocaleDateString(),
        //       isActive: true,
        //     },
        //     {
        //       userID: 1,
        //       title: "Need to improve",
        //       createTime: new Date().toLocaleDateString(),
        //       isActive: true,
        //     },
        //     {
        //       userID: 1,
        //       title: "Need to improve",
        //       createTime: new Date().toLocaleDateString(),
        //       isActive: true,
        //     },
        //   ] 
});



module.exports = homeRouter;