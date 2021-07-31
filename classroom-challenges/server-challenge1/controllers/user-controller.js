let router = require("express").Router();
let User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* USER SIGNUP */

router.post("/create", function (req, res) {
  User.create({
    username: req.body.user.username,
    password: req.body.user.password,
  })
    .then(function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        //gold

          res.json({
            user: user,
            message: "User successfully created!", //gold
            sessionToken: token, //gold
          });

      if (user) {
        res.status(200).json({ user: user });
      } else {
        res.send("User Not Created!");
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

/* USER LOGIN */

router.post('/login', function(req, res) {
    User.findOne({
        where: {
            username: req.body.user.username,
        }
    })
        .then(function loginSuccess(user) {
            if (user) {
              //gold
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                res.status(200).json({
                    user: user,
                    message: "User successfully logged in!", //gold
                    sessionToken: token, //gold           
            })
        }   else {
        res.status(500).json({ error: 'User does not exist.'})        
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;
