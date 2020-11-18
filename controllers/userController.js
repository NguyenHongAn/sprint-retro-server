const userModel = require('../models/userModel');
const handleError = require("../utils/handleError");


const {hashPassword, comparePassword} = require('../utils/bcryptFunc');

const userControlls = {

    register: async (newUser) =>{
        //B1: check email exists
        const [user, userErr] = await handleError(userModel.findOne({email: newUser.email}));
        if (userErr)
        {
            throw userErr;
        }

        else if (!user)
        {
            //B2: hash password
            const hashPass = hashPassword(newUser.password);
            newUser.password = hashPass;

            //B2: create new user with userModel
            const newUserRegister = new userModel(newUser);
            //console.log(newUserRegister);

            //B3: Save to database
            const [result, error] = await handleError(newUserRegister.save());
            if (error)
            {
                throw error;
            }
            else if (result){
                return result;
            }
            throw new Error("error occupy");
        }
        return {message: "Email is exists"};
    },

    checkEmailExists: async (email) =>{
        const [user, userErr] = await handleError(userModel.findOne({email: email}));
        
        if (userErr)
        {
            throw userErr;
        }
        else if(user) {
            return user;
        }
        return false;
    },

    checkPassword: async (userId, newPassword) =>{
        let [user, error] = await handleError(userModel.findById({_id: userId}));
        if (error)
        {
            throw error;
        }
        else if (user)
        {
            return comparePassword(newPassword, user.password);
        }
        throw new Error("error occupy");
    },

    changedUserInfo: (changedUser) =>{
        //B1: hash password 
        const hashPass = hashPassword(changedUser.newPassword);
        
        //B2: replace old password and delete pass word field
        changedUser.password = hashPass;
        delete changedUser["newPassword"];

        //B3: Create new user model
        return changedUser;

    },

    updateUserInfo: async (newUser) =>{
        let [user, error] = await handleError(userModel.findOneAndUpdate({_id: newUser._id}, newUser, {
            new: true
          }));
        if (error)
        {
            throw error;
        }
        else if (user)
        {
            return user;
        }
        throw new Error("error occupy");
    }
};

module.exports = userControlls;