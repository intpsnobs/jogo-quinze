const router = require('express').Router();
const db = require('../models/');
const path = require('path');

router.post('/login', async (req, res, next) => {
    let loginData = { username, password } = req.body;
    db.User.authenticate(loginData, (err, user) => {
        if (err) return next(err);
        user.generateAccessToken(function(err, user) {
            if (err) return res.status(400).send(err);
            res.cookie('ths_auth', user.token).status(200).json({"Login success":"True"});
        });
    });
});

router.post('/register', async (req, res, next) => {
    let userData = { username, name, email, password } = req.body;
    db.User.create(userData, (err, user) => {
        if (err) return next(err); 
        return res.redirect(200, '/');
    });
});

router.get('/', (req, res, next) => {
    try {
        token = req.headers.cookie.split("=")[1];
        if (token) {
            console.log(token);
            db.User.findByToken(token, (err, user) => {
                if(err) return res.status(400).json({"error": "token not found, clean cache and try logging in"});
                if(!user) return res.json({
                    isAuth: false,
                    error: true
                });
                res.sendFile('logged.html', {root: path.join(__dirname, '../public/views')});
            });
        }
    } catch (e) {
        res.sendFile('index.html', {root: path.join(__dirname, '../public/views')});
    }
    
})

module.exports = router;