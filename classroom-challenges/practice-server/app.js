let express = require("express");
let app = express();
let testController = require('./controllers/testcontroller')
let calculatorController = require('./controllers/calculatorcontroller');
app.use(express.json()); //incoming json obj req (order matters, this should be above the other app.use)

app.use("/test", testController );
app.use("/calculator", calculatorController);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
