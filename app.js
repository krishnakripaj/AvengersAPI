const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authentication = require("./middleware/authentication");
const emailjob = require("./middleware/emailjob");

mongoose
  .connect("mongodb://localhost/avengersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db successfully ..."))
  .catch((err) =>
    console.log("Error has occurred while connecting to DB :", err)
  );

const avengers = require("./routes/avengers");
const home = require("./routes/home");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // uses a express inbuilt middleware to parse JSON
app.use(authentication);
app.use(emailjob);
app.use("/api/avengers", avengers);
app.use("/", home);

app.listen(PORT, () => {
  console.log("Started listening on Port " + PORT);
});
