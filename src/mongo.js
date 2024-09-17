const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });
const newSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  silver: { type: Number, default: 0 },
  bronze: { type: Number, default: 0 },
});
const collection = mongoose.model("collection", newSchema);
module.exports = collection;
