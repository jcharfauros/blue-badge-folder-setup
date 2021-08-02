let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Journal = require('../db').import('../models/journal');

router.get('/practice', validateSession, function(req, res)
{
    res.send('Hey!! This is a practice route!')
})

/* JOURNAL CREATE */
router.post('/create', validateSession, (req, res) => {
    const journalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
        owner: req.user.id //user obj created in validateSession.js, using dotnotation to step into it, grab id & assign it to specific journal entry
    }
    Journal.create(journalEntry)
        .then(journal => res.status(200).json(journal))
        .catch(err => res.status(500).json({ error: err }));
})

router.get('/about', function(req, res)
{
    res.send('This is the about route')
})

module.exports = router;