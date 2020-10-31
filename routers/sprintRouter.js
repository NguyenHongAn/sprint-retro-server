//package
const express = require('express');

//get module sprint controller
const sprintControls = require('../controllers/sprintController');

const sprintRouter = express.Router();

sprintRouter.get('/', async (req,res)=>{
  let allSprints = sprintControls.allSprints();
    res.send(allSprints);

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



module.exports = sprintRouter;