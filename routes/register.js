const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER USER
router.post(
  "/",
  [
    body("firstname", "firstname must be alpha").isAlpha(),
    body("lastname", "lastname must be alpha").isAlpha(),
    body("phone", "phone must be numeric").isNumeric(),
    body("email", "invalid email").isEmail(),
    body("password", "minimum length allowed is 5 character").isLength({
      min: 5,
    }),
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.find({ email: req.body.email }).then((users) => {
      if (users.length) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User already exists!" }] });
      }

      let newUser = new User(req.body);

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
        
          throw err;
        }

        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
           if (err){
           
           throw err
         } 
          newUser.password = hashedPwd;
          newUser.save();

          let payload = {
            userId: newUser._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        });
      });
    });
  }
);

module.exports = router;
  










