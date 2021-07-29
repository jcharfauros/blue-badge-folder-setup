let router = require('express').Router();
// localhost:3000/test/post
router.post("/post", function (req, res) {
    let response = { message: "This is a test"};
    res.json(response);
});

module.exports = router;