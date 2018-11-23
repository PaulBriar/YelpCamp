const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

//Schema setup

let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c87da7eeb4bc_340.jpg",
//     description: "This is a huge granite hill, no bathrroms. No water. Beautiful granite!",
// }, (err, campground) =>{
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Newly create campground: ");
//     console.log(campground);
//   }
// });

let campground = mongoose.model("Campground", campgroundSchema);

let campgrounds = [
  {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Granite Hill", image:"https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Granite Hill", image:"https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Granite Hill", image:"https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
];
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("landing"));

//Index Route - List all campgrounds
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allcampgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allcampgrounds});
    }
  });
});

//New Route - Show form to create new campground
app.get("/campgrounds/new", (req, res) => res.render("new"));

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
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(port, () => console.log(`We are live on port ${port}`));
