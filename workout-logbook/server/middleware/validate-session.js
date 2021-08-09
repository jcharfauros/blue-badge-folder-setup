const jwt = require('jsonwebtoken'); //import JWT so that token assigned can be interacted with. Same added in usercontroller
var User = require('../db').import('../models/user'); //get more info on user by communicating with user model

const validateSession = (req, res, next) => { //fat arrow function declared that takes in 3 parameters
    const token = req.headers.authorization; //var created to hold the token
    // console.log('token -->', token); //test
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' }) //if no token present, responsd with 403 Forbidden error
    } else { //LINE 10: jwt.verify(token, secretOrPublicKey, [options, callback]) 1st - our token, 2nd - secret in .env file so method can decrypt the token, 3rd - callback function w/two parameters: 1- if successful, decodeToken will contain the decoded payload, 1 - if not successful, decodeToken remains undefined, err is null by default.
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => { //call JWT package to verify method
        // console.log('decodeToken -->', decodeToken); //test
            if(!err && decodeToken) { //if statement checks out with no errors AND decoded has a value
                User.findOne({ // LINES 13-15sequelize findOne method looks for id at matches the decodeToken.id property
                    where: {
                        id: decodeToken.id
                    }
                })
                    .then(user => { //sequelize findOne method returns a promise that can be resolved using a .then(). We pass the response as a value into the callback function.
                    // console.log('user --> ', user); //test    
                        if (!user) throw err; //if no user found, error msg is thrown
                        // console.log('req --> ', req); //test
                        req.user = user; //callback sets the user value for the request. this property is necessary late in adding to the database.
                        return next(); //end of promise resolver, this exits out of the function.
                    })
                    .catch(err => next(err)); //if promise is rejected, capture response in .catch() & pass error to the next() function.
            } else { //LINES 26-28: if no value for decodeToken, take the err parameter from line 10 & append it to the req object as a new key-value pair. Also return error w/msg that says user is not authorized.
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;