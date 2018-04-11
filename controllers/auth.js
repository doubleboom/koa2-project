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
        await service.authService.queryUser();
        try {
            let user=ctx.request.body;
                if (user.username!==""||user.password!=="") {
                   await ctx.login(user);
                    ctx.redirect('/');
                } else {
                    ctx.status = 400;
                    ctx.body = { status: 'error' };
                }
        }
        catch (err) {
            console.log(err);
        }
    },
    async postRegister(ctx, service, next) {
        await service.authService.addUser();
        try {
            let user=ctx.request.body;
                if (user.username!==""||user.password!=="") {
                    ctx.redirect('/login');
                } else {
                    ctx.status = 400;
                    ctx.body = { status: 'error' };
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