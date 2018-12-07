const express = require('express');
const router = express.Router();
const passport = require('passport');
let User = require("../models/user");

router.get("/", (req, res) => res.render("landing"));


//Show register form
router.get("/register", (req, res) => {
  res.render("register");
});
//Handle sign up logic
router.post("/register", (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if(err) {
      return res.render("register", {"error": err.message});
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome To YelpCamp, " + user.username + "!");
      res.redirect("/campgrounds");
    });
  });
});
//Show login form
router.get("/login", (req, res) => {
  res.render("login");
});
//Handle login logic
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}) ,(req, res) => {
});
//Logout logic
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});


module.exports = router;
