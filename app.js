const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody  = require('koa-body');
const views  = require('koa-views');
const path = require('path');
const passport = require('koa-passport');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const bcrypt = require('bcryptjs');

const lkoa = require('./Lkoa/core');
const lib=require('./Lkoa/lib');
const staticPath=path.resolve(__dirname, './public');
const viewsPath=path.resolve(__dirname, './views');

lib.MountPassport(passport);
const app = new lkoa();
app.use(logger());

app.keys = [ 'mysession', 'mycsrf' ];
app.use(koaBody({ multipart: true }));
app.use(lib.MountCsrfToContext);
app.use(new CSRF());                   //需放在koaBody之後

app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());

app.use(views(viewsPath, { 
    map: { html: 'ejs' },
    extension:'html'
}))


app.use(serve(staticPath));  //静态服务器的路由需要放在错误路由前面，不然会导致无法获取静态资源

app.setRouters();
app.setErroRouters(app);

app.listen(3000,'127.0.0.1',()=>console.log('服务器已经启动:http://localhost:3000'));