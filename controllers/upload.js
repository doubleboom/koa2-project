const send = require('koa-send');
const path=require('path');

module.exports = {
    async uploadXls(ctx, service, next) {
        try {
            let filePath = await service.uploadService.saveXlsFile(ctx,'excel');
            await service.uploadService.readXlsxToDb(filePath,ctx);
            ctx.body='ok';
        }
        catch (err) {
            console.log(err);
        }
    },
    async uploadImage(ctx, service, next) {
        try {
            let filePath = await service.uploadService.saveImageFile(ctx,'image');
            ctx.body={url:ctx.origin+'/upload/'+path.basename(filePath)};
        }
        catch (err) {
            console.log(err);
        }
    },
    async deleteImage(ctx, service, next) {
        try {
            ctx.body={params:ctx.params};
        }
        catch (err) {
            console.log(err);
        }
    },
    async download(ctx, service, next) {
        try {
            let filePath="";
            if(ctx.querystring!="template"){
                filePath=await service.uploadService.getFilePath(ctx.state.user);
            }
            else{
                filePath="./public/excel/template.xls";
            }
            ctx.set('Content-disposition','attachment;filename='+encodeURIComponent(path.basename(filePath)));
            await send(ctx, filePath);
        }
        catch (err) {
            console.log(err);
        }
    },
    async index(ctx, service, next) {
        try {
            await ctx.render('upload', { csrf: ctx.csrf });
        }
        catch (err) {
            console.log(err);
        }
    }
}