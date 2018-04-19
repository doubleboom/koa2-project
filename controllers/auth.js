module.exports = {
    async getRegister(ctx, service, next) {
        try {
            if(ctx.isAuthenticated()){
                ctx.redirect('/');
            }
            else{
                await ctx.render('auth/Register', { csrf:ctx.csrf });
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    async getLogin(ctx, service, next) {
        try {
            if(ctx.isAuthenticated()){
                ctx.redirect('/');
            }
            else{
                await ctx.render('auth/Login', { csrf: ctx.csrf });
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    async postLogin(ctx, service, next) {
        let user=ctx.request.body;
        try {
                let users=await service.authService.queryUser(user.acount,user.password);
                if (users.length===1) {
                   await ctx.login(users[0].id);
                   ctx.body = "yes";
                } else {
                    ctx.status = 400;
                    ctx.body = "no";
                }
        }
        catch (err) {
            console.log(err);
        }
    },
    async postRegister(ctx, service, next) {
        let user=ctx.request.body;
        try {
                if (user.acount.trim()!==""||user.password.trim()!=="") {
                    await service.authService.addUser(user.acount,user.password);
                    ctx.body = "yes";
                } else {
                    ctx.status = 400;
                    ctx.body = "no";
                }
        }
        catch (err) {
            console.log(err);
        }
    },
    async logOut(ctx){
        if (ctx.isAuthenticated()) {
            ctx.logout();
            ctx.redirect('/Login');
          } else {
            ctx.body = { success: false };
            ctx.throw(401);
          }
    }
}