const koaErrorLogger = require('../Lkoa/log4').koaErrorLogger();

module.exports = {
    async getList(ctx, service, next) {
        try {
            let table = ctx.params.table;
            let sortFiled = "id"; 
            if(table!=="shop"&&table!=="discount")
                sortFiled=table+"order";
            let bannerList = await service.apiService.getListByUserid(table, ctx.state.user, sortFiled);
            ctx.type = "application/json;charset=utf-8";
            ctx.body = bannerList;
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
            ctx.body = "fail";
        }
    },
    async getItem(ctx, service, next) {
        try {
            let table = ctx.params.table;
            let id = ctx.params.id;
            let bannerList = await service.apiService.getItemById(table, id);
            ctx.type = "application/json;charset=utf-8";
            ctx.body = bannerList;
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
            ctx.body = "fail";
        }
    },
    async deleteById(ctx, service, next) {
        let table = ctx.query.table;
        let ids = ctx.query.ids;
        try {
            await service.apiService.deleteById(table, ids, ctx.state.user);
            ctx.body = "ok";
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
            ctx.body = "fail";
        }
    },
    async addData(ctx, service, next) {
        let params = ctx.request.body;
        try {
            let table = params.table;
            delete params._csrf;
            delete params.table;
            delete params.id;
            let data = params;
            data.userid = ctx.state.user;
            data.createtime=new Date();
            await service.apiService.addItem(table, data);
            ctx.body = "ok";
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
            ctx.body = "fail";
        }
    },
    async editData(ctx, service, next) {
        let params = ctx.request.body;
        let table = params.table;
        let id = params.id;
        try {
            let item = await service.apiService.getItemById(table, id);
            if (item.length != 0 && item[0].userid === ctx.state.user) {
                delete params._csrf;
                delete params.table;
                delete params.id;
                params.createtime = new Date();
                await service.apiService.editItem(table, params, id);
                ctx.body = "ok";
            }
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
            ctx.body = "fail";
        }
    },
}