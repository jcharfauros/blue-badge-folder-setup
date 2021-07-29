let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/usercontroller');
let journal = require('./controllers/journalcontroller');

sequelize.sync();
//sequelize.sync({forceL true})

app.use('/user', user);
app.use('/journal', journal);

app.listen(3000, function(){
    console.log("App is listening on port 3000");
});


//test code from set up
// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the server!')
// })