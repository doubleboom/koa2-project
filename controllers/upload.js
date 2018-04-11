module.exports={
    async upload(ctx,service,next){
        await service.uploadService.saveFile(ctx);
        ctx.redirect('/');
   },
   async index(ctx,service,next){
    try{
       await ctx.render('upload',{csrf:ctx.csrf});
   }
   catch(err){
    console.log(err);
   }
}
}