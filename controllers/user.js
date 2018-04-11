module.exports={
    async getUser(ctx,service,next){
        await service.userService.getUser();
        await ctx.render('user');
    }
}