const koaErrorLogger = require('../Lkoa/log4').koaErrorLogger();

module.exports = {
    async getRegister(ctx, service, next) {
        try {
            // if (ctx.isAuthenticated()) {
            //     ctx.redirect('/');
            // }
            // else {
            await ctx.render('auth/Register', { csrf: ctx.csrf });
            // }
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async getLogin(ctx, service, next) {
        try {
            if (ctx.isAuthenticated()) {
                ctx.redirect('/');
            }
            else {
                await ctx.render('auth/Login', { csrf: ctx.csrf });
            }
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async postLogin(ctx, service, next) {
        let user = ctx.request.body;
        try {
            let users = await service.authService.queryUser(user.acount, user.password);
            if (users.length === 1) {
                await ctx.login(users[0].id);
                ctx.body = "yes";
            } else {
                ctx.status = 400;
                ctx.body = "no";
            }
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async postRegister(ctx, service, next) {
        let user = ctx.request.body;
        try {
            let dbuser = service.apiService.getItemById('user', ctx.status.user)[0];
            if ((dbuser.level === 1 && dbuser.acount !== user.acount.trim()) && (user.acount.trim() !== "" && user.password.trim() !== "")) {
                await service.authService.addUser(user.acount, user.password);
                ctx.body = "yes";
            } else {
                ctx.status = 400;
                ctx.body = "no";
            }
        }
        catch (err) {
            koaErrorLogger.error(err.stack);
        }
    },
    async logOut(ctx) {
        if (ctx.isAuthenticated()) {
            ctx.logout();
            ctx.redirect('/Login');
        } else {
            ctx.body = { success: false };
            ctx.throw(401);
        }
    }
}