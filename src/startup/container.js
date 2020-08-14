const { createContainer, asClass, asValue, asFunction } =  require('awilix');

// Server
const app = require('.');

// Config
const config = require('../config');

// Router
const Routes = require('../routes');
const { HomeRoutes } = require('../routes/index.routes');

// Controllers
const { HomeController } = require('../controllers');

// Services
const { HomeService } = require('../services');

const container =  createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })

module.exports = container;