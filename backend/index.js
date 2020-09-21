const express = require("express") // our express server
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 3000 // port that the server is running on => localhost:3000
const db = require('./models/')
const cors = require("cors")


app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload
app.use(cors());

app.post('/login', async (req, res, next) => {
    
});

app.post('/register', async (req, res, next) => {
    let userData = { username, name, email, password } = req.body;
    console.log(userData)
    db.User.create(userData, (err, user) => {
        if (err) return next(err);
        return res.redirect(200, '/');
    });
});

app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`) // print this when the server starts
});