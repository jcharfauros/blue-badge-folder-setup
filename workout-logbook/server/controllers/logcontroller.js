let express = require('express');
let router = express.Router();

router.get('/practice', function(req, res) 
{
    res.send('hey this is a test of the log route')
})

/* LOG CREATE */

/* GET LOGS BY USER */

/* UPDATE LOG */

/* DELETE LOG */


module.exports = router;