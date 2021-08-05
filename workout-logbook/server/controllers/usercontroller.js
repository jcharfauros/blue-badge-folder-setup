const router = require('express').Router();
const User = require('../db').import('../models/user');

/* USER REGISTER */
router.post('/register', function(req, res) {

    User.create({
        email: req.body.user.email,
        passwordhash: req.body.user.passwordhash
    })
        .then(
            function registerSuccess(user) {
                res.json({
                    user: user
                });
            }            
        )
        .catch(err => res.status(500).json({ error: err }))
});

/* USER LOGIN */
router.post('/login', function(req, res) {
    User.findOne({
        where: {
            email: req.body.user.email,
        }
    })
        .then(function loginSuccess(user) {
            if(user) {
                res.status(200).json({
                    user: user
                })
            } else {
                res.status(500).json({ error: "User does not exist" })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;