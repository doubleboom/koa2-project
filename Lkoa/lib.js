//When user upload file,koa-body can't get _csrf from body,so this method do this.
function MountCsrfToContext(ctx, next) {
    if (ctx.request.body.files) {
        ctx.request.body._csrf = ctx.request.body.fields._csrf;
    }
    return next();
}

//register koa-passport method,otherwise it would failed to serialize user into session.
function MountPassport(passport){
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}

function MountAuthToContext(ctx, next) {
    if(ctx.isAuthenticated()||(ctx.path==='/auth/login'||ctx.path==='/login')) return next();
    else ctx.redirect('/login');
}


module.exports = {
    MountCsrfToContext,
    MountAuthToContext,
    MountPassport
}