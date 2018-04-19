module.exports=(app)=>{
    const crl=app.controllers;
    return{
        'get /':crl.index.getIndex,
        'get /index':crl.index.getIndex,
        'get /register':crl.auth.getRegister,
        'get /login':crl.auth.getLogin,
        'get /logout':crl.auth.logOut,
        'get /uploadxls':crl.upload.index,
        'get /download':crl.upload.download,
        'get /api/getList/:table':crl.api.getList,
        'get /api/getEdit/:table/:id':crl.api.getItem,
        'post /api/add/':crl.api.addData,
        'delete /api/delete/:table/:id':crl.api.deleteById,
        'put /api/edit':crl.api.editData,
        'post /uploadxls':crl.upload.uploadXls,
        'post /uploadimage':crl.upload.uploadImage,
        'post /api/deleteimage':crl.upload.deleteImage,
        'post /auth/login':crl.auth.postLogin,
        'post /auth/register':crl.auth.postRegister,
        'get /*':crl.notFoundPage.notFoundPage  //错误页面处理
    }
}