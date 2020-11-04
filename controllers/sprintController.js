const sprintModel = require('../models/sprintModel');
const columnModel = require('../models/columnModel');
const userModel = require('../models/userModel');

const sprintController = {
    
    allSprints: async () =>{
        const sprints = await sprintModel.find().populate("columns", "columnType").exec();
       //console.log(sprints.populated());
        return sprints;
    },

    addNewSprint: async (newSprint) =>{
        const sprint = new sprintModel(newSprint);
        const result = await sprint.save(async (error) =>{
            if (error) {console.log(error)}
            else{
                let user = await userModel.find({_id: sprint.userID});
                user.sprints.push(sprint);
                user.save();
            }
        }); 
        console.log(sprint);
        return sprint;
    },

    getSprintBySprintId: async (sprintId) =>{
        const sprints = await sprintModel.findById(sprintId).populate("columns").exec();
        //console.log(sprints);
        return sprints;
    },

    changeSprintInfo:  async (sprintId, newSprint) =>{
        let result = await sprintModel.updateOne({_id: sprintId},newSprint);
        return result;
    },

    deleteSprint: async (sprintId) =>{
        const result = await sprintModel.deleteOne({_id: sprintId}, (error)=>{
            if(error){console.log(error)}
            else {
                const result = columnModel.deleteMany({sprintID: sprintId});
            }
        }).exec();
        return result; 
    }
};


module.exports = sprintController;