const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");
const port = 3000;

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("landing"));

//Index Route - List all campgrounds
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allcampgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allcampgrounds});
    }
  });
});

//New Route - Show form to create new campground
app.get("/campgrounds/new", (req, res) => res.render("campgrounds/new"));

//Create Route - Add new campground to DB
app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//Show - show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//Comments Route
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: foundCampground});
    }
  });
});

app.listen(port, () => console.log(`We are live on port ${port}`));
