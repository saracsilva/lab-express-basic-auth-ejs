const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const app = require("../app");
/* GET SignUP page */

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
/* POST SignUP page */
router.post("/signup", async (req, res) => {
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
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
module.exports = router;
