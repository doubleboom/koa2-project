module.exports = {
    async getHome(ctx, service, next) {
        try {
            let userid = ctx.params.userid;
            let bannerList = await service.wxapiService.getListByUserid('banner', userid);
            let categoryList= await service.wxapiService.getListByUserid('category',userid);
            let hotList =await service.wxapiService.getListByUserid('good',userid)
            ctx.type = "application/json;charset=utf-8";
            ctx.body = {bannerList,categoryList,hotList};
        }
        catch (err) {
            console.log(err);
            ctx.body = "fail";
        }
    },
    async getMore(ctx, service, next) {
        try {
            let userid = ctx.params.userid;
            let start = ctx.params.start;
            let end = ctx.params.end;
            let goodList = await service.wxapiService.getListByUserid('good', userid,start,end);
            ctx.type = "application/json;charset=utf-8";
            ctx.body = goodList;
        }
        catch (err) {
            console.log(err);
            ctx.body = "fail";
        }
    },
    async getDiscount(ctx, service, next) {
        try {
            let userid = ctx.params.userid;
            let bannerList = await service.wxapiService.getListByUserid('discount', userid);
            ctx.type = "application/json;charset=utf-8";
            ctx.body = bannerList;
        }
        catch (err) {
            console.log(err);
            ctx.body = "fail";
        }
    },
    async getAbout(ctx, service, next) {
        try {
            let userid = ctx.params.userid;
            let bannerList = await service.wxapiService.getListByUserid('shop', ctx.state.user);
            ctx.type = "application/json;charset=utf-8";
            ctx.body = bannerList;
        }
        catch (err) {
            console.log(err);
            ctx.body = "fail";
        }
    },
    async getGoodDetail(ctx, service, next){
        try {
            let id = ctx.params.id;
            let good = await service.wxapiService.getItemById('good', id);
            ctx.type = "application/json;charset=utf-8";
            ctx.body = good[0];
        }
        catch (err) {
            console.log(err);
            ctx.body = "fail";
        }
    },
    async getCategoryDetail(ctx, service, next){
        try {
            let id = ctx.params.id;
            let item={goodcategoryid:id};
            let goodList = await service.wxapiService.getListByItem('good', item);
            ctx.type = "application/json;charset=utf-8";
            ctx.body = goodList;
        }
        catch (err) {
            console.log(err);
            ctx.body = "fail";
        }
    }
}