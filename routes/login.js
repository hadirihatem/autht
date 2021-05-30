const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//load connected User

router.get("/", authMiddleware, (req, res) => {
  User.findById(req.userId)
    .select("-password -__v")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    });
});

//login user

router.post(
  "/",
  [
    body("email", "please entre a valid email").isEmail(),
    body("password", "please write your PW").notEmpty(),
  ],

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "please register before" }] });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(400).json({ errors: err });
        }
        if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: "PSW wrong" }] });
        } else {
          let payload = {
            userId: user._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        }
      });
    });
  }
);

module.exports = router;
