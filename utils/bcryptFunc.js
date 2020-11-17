const bcrypt = require('bcrypt');
const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, SALT_ROUND);
}
const comparePassword= ( password, password2) =>{
    return bcrypt.compareSync(password,password2);
}
module.exports = {hashPassword, comparePassword };