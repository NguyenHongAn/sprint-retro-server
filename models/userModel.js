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
    sprints: [
        {
            type: Schema.Types.ObjectId,
            ref: "sprints",
        }
    ]
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;