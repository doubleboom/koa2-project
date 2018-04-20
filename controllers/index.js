module.exports = {
    async getIndex(ctx, service, next) {
        await service.indexService.getIndex();
        try {
            await ctx.render('index', { csrf: ctx.csrf });
        }
        catch (err) {
            console.log(err);
        }
    }
}