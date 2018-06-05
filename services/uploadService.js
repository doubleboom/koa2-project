const path = require('path');
const fs = require('fs');
const xlsx = require('node-xlsx')
const { insertOrUpdateMultipleData,findDataById, updateData, deleteDataByUserid, insertMultipleData } = require('../db/dbUtils');

module.exports = {
    async saveXlsFile(ctx) {
        const file = ctx.request.body.files.file;
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(path.resolve('./public/upload/' + Date.now() + file.name));
        await reader.pipe(stream);
        await updateData("user", { userexcel: stream.path }, ctx.state.user);
        fs.unlinkSync(file.path);
        return path.resolve(__dirname, '../', stream.path);
    },
    async saveImageFile(ctx) {
        const file = ctx.request.body.files.files;
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(path.resolve('./public/upload/' + Date.now() + file.name));
        await reader.pipe(stream);
        fs.unlinkSync(file.path);
        return path.resolve(__dirname, '../', stream.path);
    },
    async readXlsxToDb(path, ctx) {
        const workSheetsFromFile = xlsx.parse(path);
        let data = workSheetsFromFile[0].data;
        let discountModel = [];
        let discountModelArray = [];
        for (let i = 1; i < data.length; i++) {
            discountModel = data[i];
            let validateModel=discountModel.filter(function (value) { return value != null && value != undefined});
            if(validateModel.length!=data[0].length)
                continue;
            discountModel[3] = new Date(1900, 0, discountModel[3] - 1);
            discountModel.unshift(ctx.state.user);
            discountModelArray.push(discountModel);
        }
        if (discountModelArray.length != 0) {
            await deleteDataByUserid("discount", ctx.state.user);
            await insertOrUpdateMultipleData("discount", ['userid', 'discountname', 'discountprice', 'discountoriginalprice', 'discountexpirydate','discountcategory'], discountModelArray);
        }
    },
    async getFilePath(id) {
        let user = await findDataById("user", id);
        return user[0].userexcel;
    }
};
