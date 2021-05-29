var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Slider  = require("../models/slider")    //Slider Images
var Contact  = require("../models/contact")    //Contact Details
var Timeline = require("../models/timeline");	//Timeline
const middleware = require("../middleware");
const { isLoggedIn, isSafe, checkUserImage, checkUserTimeline} = middleware;

router.get("/",function(req,res){
	res.redirect("index");
});
router.get("/index",function(req,res){
	Slider.find({}, function(err, allSlider){
		if(err){
			console.log(err);
		} else {
			res.render("index",{sliders: allSlider});
		}
	});
});
router.get("/contact",function(req,res){
	Contact.find({}, function(err, contact){
		if(err){
			console.log(err);
		} else {
			res.render("contact",{contact: contact});
		}
	});
});
router.get("/contactnew", isLoggedIn, function(req, res){
	res.render("contactnew"); 
});
router.post("/contact", isLoggedIn, isSafe , function(req, res){
    var mobile = req.body.mobile;
	var email = req.body.email;
	var facebook = req.body.facebook;
	var twitter = req.body.twitter;
	var google = req.body.google;
	var instagram = req.body.instagram;
	var address = req.body.address;
	var map = req.body.map;
    var newData = {mobile: mobile,email:email,address:address,facebook:facebook,twitter:twitter,google:google,instagram:instagram,map:map};
    // Create a new Contact and save to DB
    Contact.create(newData, function(err, newlyCreated){
        if(err){
            req.flash('error', 'Sorry, Contact cannot be created successfully ');
            return res.redirect("contact");
        } else {
			req.flash("success", "Successfully Added ");
            res.redirect("contact");
        }
    });
});
router.get("/contact/edit", isLoggedIn, function(req, res){
    //render edit template with contact
	Contact.find({}, function(err, contact){
		if(err){
			console.log(err);
		} else {
			res.render("contactedit",{contact: contact});
		}
	});;
});
// PUT - updates contact in the database
router.put("/contact", isSafe, function(req, res){
	var mobile = req.body.mobile;
	var email = req.body.email;
	var facebook = req.body.facebook;
	var twitter = req.body.twitter;
	var google = req.body.google;
	var instagram = req.body.instagram;
	var address = req.body.address;
	var map = req.body.map;
    var newData = {mobile: mobile,email:email,address:address,facebook:facebook,twitter:twitter,google:google,instagram:instagram,map:map}; 
	Contact.findByIdAndUpdate(req.body.id, {$set: newData}, function(err, contact){
        if(err){
            req.flash("error", err.message);
			console.log(err.message);
            res.redirect("contact");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("contact");
        }
    });
});
router.get("/about",function(req,res){
	Timeline.find({}, function(err, allTimeline){
		if(err){
			console.log(err);
		} else {
			res.render("about",{timelines: allTimeline});
		}
	});
});

router.get("/programs",function(req,res){
	res.render("programs");
});

router.get("/balveer",function(req,res){
	res.render("balveer");
});
router.get("/navjeevan",function(req,res){
	res.render("navjeevan");
});
router.get("/covid",function(req,res){
	res.render("covid");
});
router.get("/login",function(req,res){
	res.render("login");
});
router.get("/slidernew", isLoggedIn, function(req, res){
	res.render("slidernew"); 
});
router.post("/slider", isLoggedIn, isSafe , function(req, res){
    var image = req.body.image;
	var title = req.body.title;
    var description = req.body.description;
	var url = req.body.url;
    var newSlider = {image: image, title:title, description: description, url: url};
    // Create a new Image and save to DB
    Slider.create(newSlider, function(err, newlyCreated){
        if(err){
            req.flash('error', 'Sorry, Image cannot be created successfully ');
            return res.redirect("/index");
        } else {
			req.flash("success", "Successfully Added ");
            res.redirect("/index");
        }
    });
});
// EDIT - shows edit form for a slider
router.get("/slideredit/:id/edit", isLoggedIn, checkUserImage, function(req, res){
    //render edit template with that slider
    res.render("slideredit", {slider: req.slider});
});
// PUT - updates slider in the database
router.put("/slideredit/:id", isLoggedIn, isSafe, function(req, res){
	var image = req.body.image;
	var title = req.body.title;
    var description = req.body.description;
	var url = req.body.url;
    var newData = {image: image, title:title, description: description, url: url}; 
    Slider.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, slider){
        if(err){
            req.flash("error", err.message);
			console.log(err.message);
            res.redirect("/index");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/index");
        }
    });
});
router.delete("/sliderdelete/:id", isLoggedIn, checkUserImage, function(req, res) {
	req.slider.remove(function(err) {
		if(err) {
			req.flash('error', err.message);
			return res.redirect("/index");
		}
		req.flash('error', 'Slider deleted!');
		res.redirect("/index");
	});
});

//For Timeline
router.get("/timelinenew", isLoggedIn, function(req, res){
	res.render("timelinenew"); 
});
router.post("/timeline", isLoggedIn, isSafe , function(req, res){
    var year = req.body.year;
    var description = req.body.description;
    var newTimeline = {year: year, description: description};
    // Create a new Image and save to DB
    Timeline.create(newTimeline, function(err, newlyCreated){
        if(err){
			console.log(err);
            req.flash('error', 'Sorry, Timeline cannot be created successfully ');
            return res.redirect('about');
        } else {
			req.flash("success", "Successfully Added ");
            res.redirect("about");
        }
    });
});
router.get("/timelineedit/:id/edit", isLoggedIn, checkUserTimeline, function(req, res){
    //render edit template with that timeline
    res.render("timelineedit", {timeline: req.timeline});
});
// PUT - updates timeline in the database
router.put("/timeline/:id",isLoggedIn, isSafe, function(req, res){
	var year = req.body.year;
    var description = req.body.description;
    var newTimeline = {year: year, description: description};
    Timeline.findByIdAndUpdate(req.params.id, {$set: newTimeline}, function(err, timeline){
        if(err){
            req.flash("error", err.message);
			console.log(err.message);
            res.redirect("/about");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/about");
        }
    });
});
router.delete("/timelinedelete/:id", isLoggedIn, checkUserTimeline, function(req, res) {
	req.timeline.remove(function(err) {
		if(err) {
			req.flash('error', err.message);
			return res.redirect('/about');
		}
		req.flash('error', 'Timeline deleted!');
		res.redirect('/about');
	});
});
// show register form
router.get("/register", function(req, res){
	res.render("register"); 
 });
 
 //handle sign up logic
 router.post("/register", function(req, res){
	 var newUser = new User({username: req.body.username});
	 User.register(newUser, req.body.password, function(err, user){
		 if(err){
			 console.log(err);
			 return res.render("register", {error: err.message});
		 }
		 passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
			res.redirect("/index"); 
		 });
	 });
 });
//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/index",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome'
    }), function(req, res){
});
// logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "See you later!");
	res.redirect("/index");
 });
module.exports = router;