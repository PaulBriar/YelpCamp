const express = require("express");
const app = express();
const port = 3000;

let campgrounds = [
  {name: "Salmon Creek", image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Granite Hill", image:"https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
  {name: "Mountain Goat's Rest", image:"https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c97ca5e4b0b0_340.jpg"},
];
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("landing"));

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(port, () => console.log(`We are live on port ${port}`));