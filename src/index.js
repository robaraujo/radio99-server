var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/authController")(app);
require("./controllers/radioController")(app);
require("./controllers/pushController")(app);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
