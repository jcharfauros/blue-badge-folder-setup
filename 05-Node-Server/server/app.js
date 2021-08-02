require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
//sequelize.sync({forceL true})

app.use(express.json());
//tells the app that we want json to be used when request is processed
/* exposed route */
app.use('/user', user);

/* protected route
    We do want some info exposed to all users, so don't use this. Put this in the controller.
// app.use(require('./middleware/validate-session')); 
*/

app.use('/journal', journal);

app.listen(3000, function(){
    console.log("App is listening on port 3000");
});


//test code from set up
// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the server!')
// })