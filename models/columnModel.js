const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const columnSchema = new Schema({
    sprintID: {
        type: Schema.Types.ObjectId,
        ref: 'sprints',
    },
    columnType: {
        type: Number,
        required: true,
    },
    isActive:{
        type: Boolean,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    comment: String,
});

const columnModel = mongoose.model('columns', columnSchema);

module.exports = columnModel;

