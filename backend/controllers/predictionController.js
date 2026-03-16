const Prediction = require("../models/Prediction");

exports.uploadImage = async (req, res) => {
  try {

    const imagePath = req.file.filename;

    // Dummy AI prediction (later replace with Python model)
    const diseases = ["Acne", "Melanoma", "Rosacea"];
    const result = diseases[Math.floor(Math.random() * diseases.length)];

    const hospital = "City Skin Hospital";

    const newPrediction = new Prediction({
      image: imagePath,
      disease: result,
      hospital: hospital,
    });

    await newPrediction.save();

    res.json(newPrediction);

  } catch (error) {
    res.status(500).json(error.message);
  }
};