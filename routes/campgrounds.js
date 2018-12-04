const express = require('express');
const Campground = require("../models/campground");
const router = express.Router();

//Index Route - List all campgrounds
router.get("/", (req, res) => {
  Campground.find({}, (err, allcampgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
    }
  });
});

//New Route - Show form to create new campground
router.get("/new", (req, res) => res.render("campgrounds/new"));

//Create Route - Add new campground to DB
router.post("/campgrounds", (req, res) => {
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
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

module.exports = router;
