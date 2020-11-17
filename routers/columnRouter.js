const express = require('express');
const jwt = require('jsonwebtoken');

const columnRouter = express.Router();
const sprintControls = require('../controllers/sprintController');
const columnControls = require('../controllers/columnController');

const SECRET_KEY = process.env.SECRET_KEY;


const {authenticateJWT} = require("../middlewares/passportService");

// column page ==================================================================
columnRouter.get('/dashboard/:sprintId',authenticateJWT, async (req,res, next) =>{

    try {
        const sprint = await sprintControls.getSprintBySprintId(req.params.sprintId);
        res.send(sprint);
    } catch (error) {
        return next(error);
    }        
   
});

columnRouter.post('/dashboard/:sprintId',authenticateJWT, async (req,res, next) =>{

    const newComment = req.body;
    const id = req.params.sprintId;
    try {
        const result = await columnControls.addNewComment(id, newComment);
    
        res.send(result);
    } catch (error) {
        return next(error);
    }        
   
});

columnRouter.put('/dashboard/:sprintId',authenticateJWT, async (req,res, next) =>{

    const id = req.params.sprintId;
    const sprint = req.body;
    try {
        const result = await sprintControls.changeSprintInfo(id, sprint);
        res.send(result);
    } catch (error) {
        return next(error);
    }
    
});


columnRouter.put('/dashboard/:sprintId/:columnId',authenticateJWT, async (req,res, next) =>{
    
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

columnRouter.delete('/dashboard/:sprintId/:columnId',authenticateJWT, async (req,res, next) =>{
   
    const columnid = req.body.object;
    const sprintid = req.params.sprintId;
    try {
        const result = await columnControls.deleteColumn(sprintid,columnid);
        res.send(result);
    } catch (error) {

        return next(error);
    }
   
   
    
});


module.exports = columnRouter;