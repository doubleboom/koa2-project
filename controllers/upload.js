const send = require('koa-send');
const path = require('path');

module.exports = {
    async uploadXls(ctx, service, next) {
        try {
            let filePath = await service.uploadService.saveXlsFile(ctx, 'excel');
            await service.uploadService.readXlsxToDb(filePath, ctx);
            ctx.body = 'ok';
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async uploadImage(ctx, service, next) {
        try {
            let filePath = await service.uploadService.saveImageFile(ctx, 'image');
            ctx.body = { url: 'https://' + ctx.host +  '/upload/' + path.basename(filePath) };
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async deleteImage(ctx, service, next) {
        try {
            ctx.body = { params: ctx.params };
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async download(ctx, service, next) {
        try {
            let filePath = "";
            if (ctx.querystring != "template") {
                filePath = await service.uploadService.getFilePath(ctx.state.user);
            }
            else {
                filePath = "./public/excel/template.xls";
            }
            ctx.set('Content-disposition', 'attachment;filename=' + encodeURIComponent(path.basename(filePath)));
            await send(ctx, filePath);
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async index(ctx, service, next) {
        try {
            await ctx.render('upload', { csrf: ctx.csrf });
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    }
}