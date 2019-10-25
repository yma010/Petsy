const express = require("express"),
path = require('path'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require("mongoose");

const db = require("./config/keys").mongoURI,
users = require("./routes/api/users"),
pets = require("./routes/api/pets"),
requests = require("./routes/api/requests"),
passport = require("passport"),
image_upload = require("./routes/api/image_upload");
require("./config/passport")(passport);

const router = express.Router();

mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/pets", pets);
app.use("/api/requests", requests);
app.use("/api/image", image_upload);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

module.export = app;