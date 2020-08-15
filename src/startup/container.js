const { createContainer, asClass, asValue, asFunction } =  require('awilix');

// Server
const app = require('.');

// Config
const config = require('../config');

// Router
const Routes = require('../routes');
const { HomeRoutes } = require('../routes/index.routes');

// Controllers
const { HomeController, UserController } = require('../controllers');

// Services
const { HomeService, UserService } = require('../services');

// Models
const { User } = require('../models');

// Repositories
const { UserRepository } = require('../repository');

const container =  createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton()
    })
    .register({
        User: asValue(User)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton()
    })

module.exports = container;