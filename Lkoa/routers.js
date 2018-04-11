module.exports=(app)=>{
    const crl=app.controllers;
    return{
        'get /index':crl.index.getIndex,
        'get /':crl.user.getUser,
        'get /register':crl.auth.getRegister,
        'get /login':crl.auth.getLogin,
        'get /logout':crl.auth.logOut,
        'get /upload':crl.upload.index,
        'post /upload':crl.upload.upload,
        'post /auth/login':crl.auth.postLogin,
        'post /auth/register':crl.auth.postRegister,
        'get /*':crl.notFoundPage.notFoundPage  //错误页面处理
    }
}