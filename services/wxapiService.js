const { findDataById, findDataByUserid,findDataByPage } = require("../db/dbUtils")
module.exports = {
    async getListByUserid(table, userid) {
        return await findDataByUserid(table, userid);
    },
    async getItemById(table, id) {
        return await findDataById(table, id);
    },
    async getListByPage(table,userid,start=0,end=10){
        return await findDataByPage(table,userid,start,end);
    }
};