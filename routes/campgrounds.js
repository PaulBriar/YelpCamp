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
router.get("/new", isLoggedIn, (req, res) => res.render("campgrounds/new"));

//Create Route - Add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = {name: name, image: image, description: desc, author: author};
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
//Edit - Edit one campground
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
            res.render("campgrounds/edit", {campground: foundCampground});
    });
});
//Update
router.put("/:id", checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});
//Delete Route
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        if(foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
      res.redirect("back");
  }
};


module.exports = router;
