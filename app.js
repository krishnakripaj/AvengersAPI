const express = require("express");
const authentication = require("./middleware/authentication");
const emailjob = require("./middleware/emailjob");

const avengers = require("./routes/avengers");
const home = require("./routes/home");

const app = express();
const PORT = 3000;

app.use(express.json()); // uses a express inbuilt middleware to parse JSON
app.use(authentication);
app.use(emailjob);
app.use("/api/avengers", avengers);
app.use("/", home);

app.listen(PORT, () => {
  console.log("Started listening on Port " + PORT);
});
