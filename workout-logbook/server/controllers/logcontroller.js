const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

/* LOG CREATE - POST*/
router.post('/create', validateSession, (req, res) => {
    
    const workoutLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
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

/* UPDATE LOG - /log/:logId PUT*/
router.put('/update/:logId', validateSession, function(req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    };

    const query = { where: { id: req.params.logId, owner_id: req.user.id }};

    Log.update(updateLogEntry, query) 
        .then((logs) => res.status(200).json(logs))        
        .catch((err) => res.status(500).json({ error: err }));
});

/* DELETE LOG - /log/:logId DELETE*/
router.delete('/delete/:logId', validateSession, function (req, res) {

    Log.destroy({
        where: {
            id: req.params.logId, 
            owner_id: req.user.id
        }
    })
    .then(function deleteEntry(log) {
        if(log) {

            res.status(200).json({
                log: log,
                message: 'Workout log entry successfully deleted!',
            })
        } else {
            res.status(502).send({ error: 'Unable to delete workout log!'});
        }
    });    
});

module.exports = router;