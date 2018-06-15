const { findDataById, findDataByUserid, deleteDataById, insertData, updateData } = require("../db/dbUtils")
module.exports = {
    async getListByUserid(table, userid, sortField) {
        return await findDataByUserid(table, userid, sortField);
    },
    async getItemById(table, id) {
        return await findDataById(table, id);
    },
    async deleteById(table, ids,userid) {
        return await deleteDataById(table, ids, userid);
    },
    async addItem(table, data) {
        return await insertData(table, data);
    },
    async editItem(table, data, id) {
        return await updateData(table, data, id);
    }
};