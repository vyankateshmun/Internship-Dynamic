var Slider   = require('../models/slider');
var Timeline   = require('../models/timeline');
var Program   = require('../models/program');
var Covid    = require('../models/covid');
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
    checkUserProgram: function(req, res, next){
        Program.findById(req.params.id, function(err, foundProgram){
            if(err || !foundProgram){
                req.flash('error', 'Sorry, that program does not exist!');
                res.redirect('/program');
            } else{
                req.program = foundProgram;
                next();
            }
        });
    },
    checkCovidProgram: function(req, res, next){
        Covid.findById(req.params.id, function(err, foundCovid){
            if(err || !foundCovid){
                req.flash('error', 'Sorry, that program does not exist!');
                res.redirect('/covid');
            } else{
                req.covid = foundCovid;
                next();
            }
        });
    },
    isSafe: function(req, res, next) {
        next();
    }
}