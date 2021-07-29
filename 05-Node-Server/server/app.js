let express = require('express');
let app = express();
let journal = require('./controllers/journalcontroller')

//test code from set up
// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the server!')
// })

app.use('/journal', journal)

app.listen(3000, function(){
    console.log("App is listening on port 3000");
});

