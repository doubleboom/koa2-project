//When user upload file,koa-body can't get _csrf from body,so this method do this.
function MountCsrfToContext(ctx, next) {
    if (ctx.request.body.files) {
        ctx.request.body._csrf = ctx.request.body.fields._csrf;
    }
    return next();
}

//register koa-passport method,otherwise it would failed to serialize user into session.
function MountPassport(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}

function MountAuthToContext(ctx, next) {
    if (ctx.isAuthenticated() || (ctx.path === '/auth/login' || ctx.path === '/login' || ctx.path === '/register' 
        || ctx.path === '/auth/register' || ctx.path.search('wxapi') != -1) || ctx.path.search('upload') != -1) 
    return next();
    else ctx.redirect('/login');
}

//if use jquery $("<div>").text(value).html()
//https://github.com/janl/mustache.js/blob/master/mustache.js#L60
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

module.exports = {
    MountCsrfToContext,
    MountAuthToContext,
    MountPassport
}