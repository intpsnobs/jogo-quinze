const express = require("express") // our express server
const app = express() // generate an app object
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 3000 // port that the server is running on => localhost:3000
const db = require('./models/')

app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload

app.get('/todos', async (req, res, next) => {
    try {
        const todos = await db.Todo.find({});
        return success(res, todos);
    } catch (err) {
        next({ status: 400, message: "Failed to get Todos"})
    }
})

app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`) // print this when the server starts
})