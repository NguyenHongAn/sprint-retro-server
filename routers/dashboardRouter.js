const express= require('express');

const sprintControls = require('../controllers/sprintController');
const columnControls = require('../controllers/columnController');
const dashboardRouter = express.Router();


//dashboard page ===================================================
dashboardRouter.get('/dashboard', async (req,res, next) =>{
    let allSprints = await sprintControls.allSprints();
    res.send({
        boards: allSprints,
    });
});

dashboardRouter.post('/dashboard', async (req,res, next) =>{
    const newSprint = req.body;
    const result = await sprintControls.addNewSprint(newSprint);
    console.log(result);
    res.send(result);
});

dashboardRouter.delete('/dashboard', async (req,res, next) =>{
    let sprintId = req.body.object;
    console.log(sprintId);
    const result = sprintControls.deleteSprint(sprintId);
    res.send(result);
});

// column page ==================================================================
dashboardRouter.get('/dashboard/:sprintId', async (req,res, next) =>{
    let sprint = await sprintControls.getSprintBySprintId(req.params.sprintId);
    res.send(sprint);
});

dashboardRouter.post('/dashboard/:sprintId', async (req,res, next) =>{
    const newComment = req.body;
    const id = req.params.sprintId;
    
    let result = await columnControls.addNewComment(id, newComment);
    
    res.send(result);
});

dashboardRouter.put('/dashboard/:sprintId',async (req,res, next) =>{
    let id = req.params.sprintId;
    let sprint = req.body;
   
    let result = await sprintControls.changeSprintInfo(id, sprint);
    //console.log(result);
    res.send(result);
});


dashboardRouter.put('/dashboard/:sprintId/:columnId',async (req,res, next) =>{
    let id = req.params.columnId;
    let column = req.body;
    
    let result = await columnControls.changeColumnInfo(id, column);
    //console.log(result);
    res.send(result);
});

dashboardRouter.delete('/dashboard/:sprintId/:columnId',async (req,res, next) =>{
    let columnid = req.params.columnId;
    let sprintid = req.params.sprintId;
    let result = await columnControls.deleteColumn(sprintid,columnid);
    //console.log(result);
    res.send(result);
});

module.exports = dashboardRouter;