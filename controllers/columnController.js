const columnModel = require('../models/columnModel');
const sprintModel = require('../models/sprintModel');

const columnControls = {
    addNewComment: async (sprintId,comment) =>{
        const newComment = new columnModel(comment);
        let result = await newComment.save(async (error) =>{
            if (error) {console.log(error)}
            else{
                let sprint = await sprintModel.findById({_id: sprintId});
                if (error) {console.log(error)}
                else
                {
                    sprint.columns.push(newComment);
                    sprint.save();
                }
              
            }
        });
        return newComment;
    },

    changeColumnInfo: async (columnId, col) =>{
        const changedCol = new columnModel(col);
        const result = await columnModel.update({_id: columnId},changedCol);
        return changedCol;
    },
    deleteColumn: async (sprintid,columnid) =>{
        const result = await columnModel.deleteOne({_id: columnid}, async (error)=>{
            if(error){console.log(error)}
            else {
                let result = await sprintModel.findById({_id: sprintid});
                result.columns = result.columns.filter(column => column !== columnid);
                result.save();
            }
        }).exec();
        return result; 
    }
}

module.exports = columnControls;