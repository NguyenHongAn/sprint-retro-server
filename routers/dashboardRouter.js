const express= require('express');

const sprintControls = require('../controllers/sprintController');
const columnControls = require('../controllers/columnController');
const dashboardRouter = express.Router();


//dashboard page ===================================================
dashboardRouter.get('/dashboard', async (req,res, next) =>{
    try {
        const allSprints = await sprintControls.allSprints();
        res.send({
        boards: allSprints,
        });
    } catch (error) {
        return next(error);
    }
    
});

dashboardRouter.post('/dashboard', async (req,res, next) =>{
    const newSprint = req.body;
    try {
        const result = await sprintControls.addNewSprint(newSprint);
        res.send(result);
    } catch (error) {
        return next(error);
    }
    
});

dashboardRouter.delete('/dashboard', async (req,res, next) =>{
    const sprint = req.body.object;
    console.log({sprint});
    try {
        const result = await sprintControls.deleteSprint(sprint._id, sprint.userID);
        res.send(result);
    } catch (error) {
        return next(error);
    }
   
});

// column page ==================================================================
dashboardRouter.get('/dashboard/:sprintId', async (req,res, next) =>{
    try {
        const sprint = await sprintControls.getSprintBySprintId(req.params.sprintId);
        res.send(sprint);
    } catch (error) {
        return next(error);
    }
    
});

dashboardRouter.post('/dashboard/:sprintId', async (req,res, next) =>{
    const newComment = req.body;
    const id = req.params.sprintId;
    try {
        const result = await columnControls.addNewComment(id, newComment);
    
        res.send(result);
    } catch (error) {
        return next(error);
    }
   
});

dashboardRouter.put('/dashboard/:sprintId',async (req,res, next) =>{
    const id = req.params.sprintId;
    const sprint = req.body;
    try {
        const result = await sprintControls.changeSprintInfo(id, sprint);
        res.send(result);
    } catch (error) {
        return next(error);
    }
    
});


dashboardRouter.put('/dashboard/:sprintId/:columnId',async (req,res, next) =>{
    const id = req.params.columnId;
    const column = req.body;
    try {
        const result = await columnControls.changeColumnInfo(id, column);
        //console.log(result);
        res.send(result);
    } catch (error) {
        return next(error);
    }
   
});

dashboardRouter.delete('/dashboard/:sprintId/:columnId',async (req,res, next) =>{
    const columnid = req.body.object;
    const sprintid = req.params.sprintId;
    try {
        const result = await columnControls.deleteColumn(sprintid,columnid);
        res.send(result);
    } catch (error) {

        return next(error);
    }
    
});

module.exports = dashboardRouter;