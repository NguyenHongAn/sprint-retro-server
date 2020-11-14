//package
const express = require('express');

//get module sprint controller


const homeRouter = express.Router();

homeRouter.get('/', async (req,res)=>{
  //res.status(200);
  res.send("Successfull connnect with server");

});



module.exports = homeRouter;