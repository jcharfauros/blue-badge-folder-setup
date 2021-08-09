const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

router.get('/practice', validateSession, function(req, res) 
{
    res.send('hey this is a test of the log route')
})

/* LOG CREATE - POST*/
router.post('/create', validateSession, (req, res) => {
    const workoutLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id //is this right? or owner_id
    }
    Log.create(workoutLogEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})

/* GET All - GET */
router.get('/', (req, res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/* GET INDIVIDUAL LOG BY USER  - /log/:id GET */
router.get('/mylog', validateSession, (req, res) => {
    let userid = req.user.id

    Log.findAll({
        where: { owner_id: userid }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

/* UPDATE LOG - /log/:id PUT*/


/* DELETE LOG - /log/:id DELETE*/


module.exports = router;