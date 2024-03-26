const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const { buffer } = require("stream/consumers");

dotenv.config({ path: path.join(__dirname, ".env") });
const database = process.env.database;
const connect = mongoose.connect(database);

connect
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log("database is not connected");
  });

//Schema

const MySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

const collection = new mongoose.model("signup", MySchema);
module.exports = collection;
