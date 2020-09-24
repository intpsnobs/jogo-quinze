require("dotenv").config()
const path = require('path');
const express = require("express") // our express server
const app = express() // generate an app object
const cors = require("cors")
const router = require('./routes/router')
const db = require('./models')

const PORT = process.env.PORT || 3333 // port that the server is running on => localhost:3000

app.use(express.json()) // telling the app that we are going to use json to handle incoming payload
app.use(cors());
app.use('/js/', express.static('public/scripts'))
app.use('/css/', express.static('public/styles'))

// app.use('/', express.static('public/views'))

// app.get('/', async (req, res, next) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// });



app.use(router);

app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`) // print this when the server starts
});

