const router = require('express').Router();
const userRoutes = require('../routes/user');
const gameRoutes = require('../routes/game');

router.use(userRoutes);
router.use(gameRoutes);

module.exports =  router;