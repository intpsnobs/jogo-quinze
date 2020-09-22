const router = require('express').Router();
const jwt = require("jsonwebtoken");
const db = require('../models/');

generateAccessToken = (username) => jwt.sign(username, process.env.ACCESS_TOKEN, {expiresIn: '1800s'});

router.post('/login', async (req, res, next) => {
    let loginData = { username, password } = req.body;
    db.User.authenticate(loginData, (err, user) => {
        if (err) return next(err);
        const token = generateAccessToken({username: username});
        res.json(token);
    });
});

router.post('/register', async (req, res, next) => {
    let userData = { username, name, email, password } = req.body;
    db.User.create(userData, (err, user) => {
        if (err) return next(err);
        return res.redirect(200, '/');
    });
});

module.exports = router;