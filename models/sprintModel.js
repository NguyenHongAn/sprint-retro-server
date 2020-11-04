const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema for 
const sprintSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users",
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
        default: Date.now,
        required: true,
    },
    members: Number,
    columns: [
        {
            type: Schema.Types.ObjectId,
            ref: 'columns',
        }
    ]
});

//create model and export model
const sprintModel = mongoose.model("sprints", sprintSchema);

module.exports = sprintModel;