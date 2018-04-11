module.exports={
    async getIndex(ctx,service,next){
       await service.indexService.getIndex();
       try{
           await ctx.render('index');
       }
       catch(err){
        console.log(err);
       }
   }
}