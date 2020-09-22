const router = require('express').Router();
const userRoutes = require('../routes/user');

router.use(userRoutes);

module.exports =  router;