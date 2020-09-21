const mongoose = require("mongoose") // requiring the mongoose package

const schema = new mongoose.Schema({
  // creating a schema for todo
  task: {
    // field1: task
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  completed: {
    // field2: completed
    type: Boolean, // it is a boolean
    default: false, // the default is false
  },
})

const schemaEx = mongoose.model("Todo", schema) // creating the model from the schema

module.exports = schemaEx // exporting the model