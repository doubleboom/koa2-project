const { findDataById, findDataByUserid, deleteDataById,insertData,updateData } = require("../db/dbUtils")
module.exports = {
    async getListByUserid(table, userid) {
        return await findDataByUserid(table, userid);
    },
    async getItemById(table, id) {
        return await findDataById(table, id);
    },
    async deleteById(table, id) {
        return await deleteDataById(table, id);
    },
    async addItem(table, data) {
        return await insertData(table, data);
    },
    async editItem(table,data, id) {
        return await updateData(table,data, id);
    }
};