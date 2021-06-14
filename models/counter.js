var mongoose = require("mongoose");

var counterSchema = mongoose.Schema({
    num1: String,
    num2: String,
    num3: String,
    num4: String
});

module.exports = mongoose.model("counter", counterSchema);