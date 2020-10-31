const sprintModel = require('../models/sprintModel');

const sprintController = {
    
    allSprints: async () =>{
        let allSprints = await sprintModel.find();
        return allSprints;
    },

};


module.exports = sprintController;