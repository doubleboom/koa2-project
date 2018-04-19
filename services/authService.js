const { findUserByAcount, userLogin } = require("../db/user");
const {insertData}=require('../db/dbUtils');
const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
    async queryUser(acount, password) {
        const user= await findUserByAcount(acount);
        if(comparePass(password,user[0].userpassword)){
            return user;
        }
        else{
            return "Unrecognized user";
        }
    },
    async addUser(acount, password, level = 2) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        let user = {};
        user.useracount = acount;
        user.userpassword = hash;
        user.createtime = new Date();
        user.level = level;
        user.modefytime = new Date();
        user.modefyuser = 2;
        await insertData("user", user);
    }
};