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
    facebookProvider: {
       
        id: String,
        token: String
        
    },
    googleProvider: {
      
        id: String,
        token: String
       
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