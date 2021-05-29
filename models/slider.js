var mongoose = require("mongoose");

var sliderSchema = mongoose.Schema({
    image: String,
    title: String,
    description: String,
    url: String
});

module.exports = mongoose.model("Slider", sliderSchema);