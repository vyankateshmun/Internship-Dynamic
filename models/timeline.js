var mongoose = require("mongoose");

var timelineSchema = mongoose.Schema({
    year : Number,
    description: String,
});

module.exports = mongoose.model("Timeline", timelineSchema);