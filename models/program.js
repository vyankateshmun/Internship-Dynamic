var mongoose = require("mongoose");

var programSchema = mongoose.Schema({
    title: String,
    main_image:String,
    description:String,
    background_image: String,
    details:String,
    img1:String,
    img2:String,
    img3:String,
    img4:String
});

module.exports = mongoose.model("Program", programSchema);