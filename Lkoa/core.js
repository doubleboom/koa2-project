const koa = require('koa');
const fs = require('fs');
const koaRoute = require('koa-router');
const path = require('path');

const config = require('../config/config');
const rootPath = path.resolve(__dirname, '..')

class LkoaLoader {
    loader(path) {
        const dir = fs.readdirSync(path);
        return dir.map((filename) => {
            const modules = require(path + '/' + filename);
            return { name: filename.split('.')[0], modules };
        })
    }

    loadControllers() {
        const url = rootPath + '/controllers';
        return this.loader(url);
    }

    loadServices() {
        const url = rootPath + '/services';
        return this.loader(url);
    }
}

class Lkoa extends koa {
    constructor(props) {
        super(props);
        this.router = new koaRoute();
        this.loader = new LkoaLoader();

        this.controllers = {};

        const controllers = this.loader.loadControllers();

        controllers.forEach((crl) => {
            this.controllers[crl.name] = crl.modules;
        });
        this.routers = require('./routers')(this);
        this.servicesTemp = this.getServices(this);
        this.getServices(this);
    }

    getServices(app) {
        const servicesTemp = {};
        app.loader.loadServices().forEach((service) => {
            servicesTemp[service.name] = service.modules;
        });
        return servicesTemp;
    }

    setRouters() {
        const self = this;
        const _setRouters = (app) => {
            const routers = self.routers;
            Object.keys(routers).forEach((key) => {
                const [method, path] = key.split(' ');
                app.router[method](path, async (ctx, next) => {
                    try {
                        const handler = routers[key];
                        await handler(ctx, self.servicesTemp, next);
                    }
                    catch (err) {
                        next();
                    }
                })
            })
            return app.router.routes()
        }
        self.use(_setRouters(self));
    }

    setErroRouters(app) {
        const self = this.controllers;
        app.use(async (ctx) => {
            switch (ctx.status) {
                case 404:
                    await self.notFoundPage.notFound(ctx, app.servicesTemp);
                    break;
                case 500:
                    await self.notFoundPage.inernalErro(ctx, app.servicesTemp);
                    break;
            }
        })
    }
}

module.exports = Lkoa;