const columnModel = require('../models/columnModel');
const sprintModel = require('../models/sprintModel');
const handleError = require("../utils/handleError");

const columnControls = {
    addNewComment: async (sprintId,comment) =>{
        const newComment = new columnModel(comment);
        let [result, error] = await handleError(newComment.save());

        if (error)
        { 
            throw error;
        }
        else if (result)
        {   
            const [sprint,sprintErr] = await handleError(sprintModel.findById({_id: sprintId}));
            if (sprintErr) { 
                throw sprintErr
            }
            else if (sprint)
            {
                sprint.columns.push(newComment);
                await sprint.save();
                //console.log({result});
                return result;
            }
            throw new Error("Problem occupy");
        }
        throw new Error("Problem occupy");
    },

    changeColumnInfo: async (columnId, col) =>{
        const changedCol = new columnModel(col);
        const [result,error] = await handleError(columnModel.updateOne({_id: columnId},changedCol));
        if (error){
            throw error;
        }
        else if (result)
        {
            //console.log({changedCol});
            return changedCol;
        }
        throw new Error("Problem occupy");
    },


    deleteColumn: async (sprintid,columnid) =>{
        const [result,error] = await handleError(columnModel.deleteOne({_id: columnid}));
        if (error)
        {
            throw error;
        }
        else if (result)
        {
            const [sprint,sprintErr] = await handleError(sprintModel.findById({_id: sprintid}));
            if (sprintErr)
            {
                throw sprintErr;
            }
            else if (sprint)
            {
                //console.log(columnid);
              
                sprint["columns"] = sprint["columns"].filter(columnID => !columnID.equals(columnid) );
                
                await sprint.save();
                return result;
            }
            throw new Error("Problem occupy");
        }
        throw new Error("Problem occupy");
    }
}

module.exports = columnControls;