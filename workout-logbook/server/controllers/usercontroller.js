const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* USER REGISTER */
router.post('/register', function(req, res) {

    User.create({
        email: req.body.user.email,
        passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
    })
        .then(
            function registerSuccess(user) {
                const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24}); 

                res.json({
                    user: user,
                    message: 'User successfully registered!',
                    sessionToken: token
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
                bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (err, matches) {
                    if (matches) {

                        const token = jwt.sign({id: user.id},  process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        
                        res.status(200).json({
                            user: user,
                            message: 'User successfully logged in!',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: 'Login Failed!'});
                    }
                });
            } else {
                res.status(500).json({ error: "User does not exist" })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;