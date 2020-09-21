const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://admin:2rdFf8ymNEv85AKz@odaw-0.o61h5.gcp.mongodb.net/odaw-0?retryWrites=true&w=majority", {
  // connecting to the mongodb database name: "todo-app" locally
  keepAlive: true, // keeping the connection alive
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.User = require("./user") // requiring the todo model that we just created in mongodb