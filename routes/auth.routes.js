const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const app = require("../app");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
/* GET SignUP page */

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});
/* POST SignUP page */
router.post("/signup", isLoggedOut, async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.redirect("/auth/login");
  } catch (error) {
    console.log("error");
  }
});
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, async (req, res) => {
  const { username, password } = req.body;
  const currentUser = await User.findOne({ username });
  if (!currentUser) {
    res.render("auth/login", { errorMessage: "No user with that username" });
  } else {
    if (bcrypt.compareSync(password, currentUser.password)) {
      console.log("correct password");
      /* const sessionUser = structuredClone(currentUser);
      delete sessionUser.password; */
      req.session.user = currentUser;
      res.redirect("/profile");
    } else {
      res.render("auth/login", { errorMessage: "incorrect password" });
    }
  }
});
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/auth/login");
  });
});
module.exports = router;
