const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  image: String,
  disease: String,
  hospital: String,
  feedback: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prediction", predictionSchema);