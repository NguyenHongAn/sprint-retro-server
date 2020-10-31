const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    colummnID: {
        type: Schema.Types.ObjectId,
        ref: 'column',
    },
    comment: String,
});

const cardModel = mongoose.model('card', cardSchema);

module.exports = cardModel;