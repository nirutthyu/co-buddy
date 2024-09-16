const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/react-login")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });
const newSchema = new mongoose.Schema({
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
