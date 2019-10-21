const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const pets = require("./routes/api/pets");
const passport = require("passport");

mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/pets", pets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


module.export = app;