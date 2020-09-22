require("dotenv").config()
const path = require('path');
const express = require("express") // our express server
const app = express() // generate an app object
const cors = require("cors")
const router = require('./routes/router')
const db = require('./models')

const PORT = process.env.PORT || 3000 // port that the server is running on => localhost:3000

app.use(express.json()) // telling the app that we are going to use json to handle incoming payload
app.use(cors());
app.get('/', async (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});
app.use(router);

app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`) // print this when the server starts
});

