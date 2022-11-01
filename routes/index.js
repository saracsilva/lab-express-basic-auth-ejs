const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", isLoggedIn, (req, res) => {
  console.log("SESSION =====> ", req.session);
  if (req.session.user) {
    res.render("auth/profile", { user: req.session.user });
  } else {
    res.redirect("/auth/login");
  }
});
module.exports = router;
