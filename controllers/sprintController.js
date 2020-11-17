const sprintModel = require('../models/sprintModel');
const columnModel = require('../models/columnModel');
const userModel = require('../models/userModel');
const handleError = require("../utils/handleError");

const sprintController = {
    
    getSprintsByUserId: async (userID) =>{
        const [sprints,error] = await handleError(sprintModel.find({userID: userID}).populate("columns").exec());
        if (error)
        {
            throw error;
        }
        else if(sprints)
        {
            return sprints;
        }
        throw new Error("Problem occupy");
    },

    addNewSprint: async (newSprint) =>{
        const sprint = new sprintModel(newSprint);
        
        const [result,error] = await handleError(sprint.save());
        if (error)
        {
            throw error;
        }
        else 
        {
            // update sprint id for user 
            const [user,error] = await handleError(userModel.findById(newSprint.userID));
            if (error)
            {
                throw error;
            }
            else if (user){
                user.sprints.push(result._id);
                await user.save();
                return result;
            }
            throw new Error("Problem occupy");
           
        }
    },

    getSprintBySprintId: async (sprintId) =>{
        const [sprint,error] = await handleError(sprintModel.findById(sprintId).populate("columns").exec());
        if (error)
        {
            throw error;
        }
        else if (sprint)
        {
            //console.log(sprint);
            return sprint;
        }
        throw new Error("Problem occupy");
    },

    changeSprintInfo:  async (sprintId, newSprint) =>{
        let [result,error] = await handleError(sprintModel.updateOne({_id: sprintId},newSprint));
        if (error)
        {
            throw error;
        }
        else if (result)
        {
            //console.log({result});
            return result;
        }
        throw new Error("Problem occupy");
    },

    deleteSprint: async (sprintId, userId) =>{
        const [result,error] = await handleError(sprintModel.deleteOne({_id: sprintId}));
        if (error)
        {
            throw error;
        }
        else if (result)
        {
            //Delete comment belong to this sprint
            const [column,error] = await handleError(columnModel.deleteMany({sprintID: sprintId}));
            if (error) {throw error}

            //update number of sprint of user
            const [user, userErr] = await handleError(userModel.findById(userId));
            if (userErr) {throw userError}
            //console.log({user});
            user.sprints = user.sprints.filter(sprintid => !sprintid.equals(sprintId));
            await user.save();
            return result;
        }
        throw new Error("Problem occupy");
    }
};

module.exports = sprintController;