var mongoose = require("mongoose");

var covidSchema = mongoose.Schema({
    image: String,
    title: String,
    description: String
});

module.exports = mongoose.model("Covid", covidSchema);