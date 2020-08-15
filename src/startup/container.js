const { createContainer, asClass, asValue, asFunction } =  require('awilix');

// Server
const app = require('.');

// Config
const config = require('../config');

// Router
const Routes = require('../routes');
const { HomeRoutes, UserRoutes, AuthRoutes } = require('../routes/index.routes');

// Controllers
const { HomeController, UserController, AuthController } = require('../controllers');

// Services
const { HomeService, UserService, AuthService } = require('../services');

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
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asClass(UserRoutes).singleton(),
        AuthRoutes: asClass(AuthRoutes).singleton()
    })
    .register({
        User: asValue(User)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton()
    })

module.exports = container;