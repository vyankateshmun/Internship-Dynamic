var express         = require("express"),       //Framework
    app             = express(),
    bodyParser      = require("body-parser"),   //To read body and parse into JSON object
    mongoose        = require("mongoose"),      //Makes mongodb working easier
    passport        = require("passport"),      //Used for authentication
    cookieParser    = require("cookie-parser"),
    LocalStrategy   = require("passport-local"),
    session         = require("express-session"),
	flash           = require("connect-flash"),     //Display error and success messages
	User            = require("./models/user"),     //User Schema
    methodOverride  = require("method-override");

var indexRoutes      = require("./routes/index");
mongoose.Promise = global.Promise;
const uri = "mongodb+srv://Vyankatesh:Vam@12345@sahyog.fpoka.mongodb.net/internship?retryWrites=true&w=majority";
mongoose.connect(uri ,{useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false},function(error){
	if(error) 
		console.log(error);
    else
        console.log("Connected");
});//Database


app.use(bodyParser.urlencoded({extended: true}));   //All data is parsed into body
app.set("view engine", "ejs");      //Ejs is the language used (Embedded Javascript Templates)
app.use(express.static(__dirname + "/public")); //Serves all files in public directory
app.use(methodOverride('_method'));     //Use put and delete
app.use(cookieParser('secret'));
//require moment
app.locals.moment = require('moment');
// PASSPORT CONFIGURATION
app.use(require("express-session")({	//middleware
	secret:"sahyog",
	resave: false,
	saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});
app.set('port',( process.env.PORT || 5000));
app.use("/", indexRoutes);
app.get("*",function(req,res){
	res.send("You are at wrong website");
});

app.listen(app.get( 'port' ), function(){
	console.log("Server is running on " + app.get( 'port' ));
});