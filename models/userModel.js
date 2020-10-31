const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createTime: {
        default: Date.now,
        type: Date,
    },
    DOB: Date,
    gender: Boolean,
    sprints: [
        {
            type: Schema.Types.ObjectId,
            ref: "sprint",
        }
    ]
});


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;