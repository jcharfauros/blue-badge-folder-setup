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

/* GET ALL ENTRIES */
router.get("/", (req, res) => {
    Journal.findAll()
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).ison({ error: err }))
});

/* GET ENTRIES BY USER */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Journal.findAll({
        where: { owner: userid }
    })
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

/* GET ENTRIES BY TITLE */
router.get("/:title", function(req, res) {
    let title = req.params.title;

    Journal.findAll({
        where: { title: title }
    })
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err }))
});

/* UPDATE (PUT) ENTRIES */
router.put("/update/:entryId", validateSession, function(req, res) {
    const updateJournalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id }};

    Journal.update(updateJournalEntry, query)
        .then((journals) => res.status(200).json(journals))
        .catch((err) => res.status(500).json({ error: err }));
});

/* DELETE ENTRY */
router.delete("/delete/:id", validateSession, function(req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Journal.destroy(query)
        .then(() => res.status(200).json({ message: "Journal Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

// router.get('/about', function(req, res)
// {
//     res.send('This is the about route')
// })

module.exports = router;