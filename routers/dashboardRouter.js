const express= require('express');
const jwt = require('jsonwebtoken');

const sprintControls = require('../controllers/sprintController');
const dashboardRouter = express.Router();


const {authenticateJWT} = require("../middlewares/passportService");

//dashboard page ===================================================
dashboardRouter.get('/dashboard',authenticateJWT,async (req,res, next) =>{

    try {
        const userID = req.user.userAuth._id;
        const allSprints = await sprintControls.getSprintsByUserId(userID);
        res.send({
        boards: allSprints,
        });
    } catch (error) {
        return next(error);
    }
    
});

dashboardRouter.post('/dashboard',authenticateJWT,async (req,res, next) =>{
        
    const newSprint = req.body;
    newSprint.userID = req.user.userAuth._id;
    try {
        const result = await sprintControls.addNewSprint(newSprint);
        res.send(result);
    } catch (error) {
        return next(error);
    }
    
});

dashboardRouter.delete('/dashboard', authenticateJWT,async (req,res, next) =>{
  
    const sprint = req.body.object;
    //console.log({sprint});
    try {
        const result = await sprintControls.deleteSprint(sprint._id, sprint.userID);
        res.send(result);
    } catch (error) {
        return next(error);
    }
    
});

module.exports = dashboardRouter;