module.exports={
    async notFound(ctx,service,next){
        console.log(404);
        await service.notFoundPageService.notFound();
        await ctx.render('404');
    },
    async inernalErro(ctx,service,next){
        console.log(500);
        await service.notFoundPageService.inernalErro();
        await ctx.render('500');
        ctx.body='';
    },
}