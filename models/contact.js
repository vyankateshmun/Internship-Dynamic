var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
    mobile: String,
    email: String,
    address: String,
    facebook: String,
    twitter: String,
    google: String,
    instagram: String,
    map: String
});

module.exports = mongoose.model("Contact", contactSchema);