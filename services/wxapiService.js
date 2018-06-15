const { findDataById, findDataByUserid, findDataByPage, findListByItem } = require("../db/dbUtils")
module.exports = {
    async getListByUserid(table, userid, sortField) {
        return await findDataByUserid(table, userid, sortField);
    },
    async getItemById(table, id) {
        return await findDataById(table, id);
    },
    async getListByPage(table, userid, sortField, start = 0, end = 10) {
        return await findDataByPage(table, userid, sortField, start, end);
    },
    async getListByItem(table, item) {
        return await findListByItem(table, item);
    }
};