const Campground = "../models/campground";
const Comment = "../models/comment";

let middlewareObj = {};

middlewareObj.isLoggedIn = () => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

middlewareObj.checkCommentOwnership = () => {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
      res.redirect("back");
  }
}

middlewareObj.checkCampgroundOwnership = () => {
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






module.exports = middlewareObj;
