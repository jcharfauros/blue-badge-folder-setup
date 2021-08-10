require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/usercontroller');
let journal = require('./controllers/journalcontroller');

sequelize.sync();

app.use(require('./middleware/headers')); //activating headers

app.use(express.json());
//tells the app that we want json to be used when request is processed

// app.use('/user', user);
//8/8/21 line 18 was missing, check to see if code is broken
app.use(require('./middleware/validate-session'));
app.use('/journal', journal);

app.listen(3000, function(){
    console.log("App is listening on port 3000");
});