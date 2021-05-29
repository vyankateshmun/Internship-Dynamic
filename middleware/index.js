var Slider   = require('../models/slider');
var Timeline   = require('../models/timeline');
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You must be signed in to do that!');
        res.redirect('/login');
    },
    checkUserImage: function(req, res, next){
        Slider.findById(req.params.id, function(err, foundSlider){
            if(err || !foundSlider){
                req.flash('error', 'Sorry, that slider does not exist!');
                res.redirect('/index');
            } else{
                req.slider = foundSlider;
                next();
            }
        });
    },
    checkUserTimeline: function(req, res, next){
        Timeline.findById(req.params.id, function(err, foundTimeline){
            if(err || !foundTimeline){
                req.flash('error', 'Sorry, that timeline does not exist!');
                res.redirect('/about');
            } else{
                req.timeline = foundTimeline;
                next();
            }
        });
    },
    isSafe: function(req, res, next) {
        next();
    }
}