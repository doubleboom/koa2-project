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
        'get /wxapi/gethome/:userid':crl.wxapi.getHome,
        'get /wxapi/getmore/:userid':crl.wxapi.getMore,
        'get /wxapi/getdiscount/:userid':crl.wxapi.getDiscount,
        'get /wxapi/getabout/:userid':crl.wxapi.getAbout,
        'get /wxapi/getgooddetail/:id':crl.wxapi.getGoodDetail,
        'get /wxapi/getcategorydetail/:id':crl.wxapi.getCategoryDetail,
        'post /api/add/':crl.api.addData,
        'post /uploadxls':crl.upload.uploadXls,
        'post /uploadimage':crl.upload.uploadImage,
        'post /api/deleteimage':crl.upload.deleteImage,
        'post /auth/login':crl.auth.postLogin,
        'post /auth/register':crl.auth.postRegister,
        'delete /api/delete/:table/:id':crl.api.deleteById,
        'put /api/edit':crl.api.editData,
        'get /*':crl.notFoundPage.notFoundPage  //错误页面处理
    }
}