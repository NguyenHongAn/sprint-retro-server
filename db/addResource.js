const userModel = require('../models/userModel');
const sprintModel = require('../models/sprintModel');
const columnModel= require('../models/columnModel')
const cardModel = require('../models/cardModel');

const DEFAULT_TEMPLATE = require('./defaultTemplate');

const newUser = new userModel({
    username: "advneter",
    password: 'password',
    email: "email@gmail.com",
    createTime: Date.now(),
    gender: true,
});

newUser.save();

const newSprint = new sprintModel({
    
})

