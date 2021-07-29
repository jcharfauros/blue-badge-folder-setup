const router = require('express').Router();
const User = require('../db').import('../models/user');

/* USER SIGNUP */
router.post('/create', function(req, res) {

    User.create({
        email: req.body.user.email,
        password: req.body.user.password
    })
        .then(
            function createSuccess(user){
                res.json({
                    user: user
                });
            }
        )
        .catch(err=> res.status(500).json({error: err}))
});


module.exports = router;