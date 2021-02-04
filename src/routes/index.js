const { Router } = require('express');
const usersRouter = require('./user.route');
const followersRouter = require('./follower.route');
const followingsRouter = require('./following.route');
const repositoriesRouter = require('./repository.route');
const repositoriesStarsRouter = require('./repositoriesstars.route');

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/followers', followersRouter)
routes.use('/followings', followingsRouter)
routes.use('/repositories', repositoriesRouter)
routes.use('/repositoriesStars', repositoriesStarsRouter)

module.exports = routes