const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const columnSchema = new Schema({
    sprintID: {
        type: Schema.Types.ObjectId,
        ref: 'sprint',
    },
    columnType: {
        type: Number,
        required: true,
    },
    isActive:{
        type: Boolean,
        required: true,
    },
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'card',
        }
    ],
});

const columnModel = mongoose.model('column', columnSchema);

module.exports = columnModel;

