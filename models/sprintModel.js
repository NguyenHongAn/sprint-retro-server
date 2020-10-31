const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema for 
const sprintSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    title:  {
        type: String,
        required: true,
    },
    isActive:  {
        type: Boolean,
        required: true,
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    members: Number,
    columns: [
        {
            type: Schema.Types.ObjectId,
            ref: 'column',
        }
    ]
});

//create model and export model
const sprintModel = mongoose.model("sprint", sprintSchema);

module.exports = sprintModel;