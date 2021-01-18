const express = require("express");
const router = express.Router();

let avengerArray = [
  { id: 1, name: "Iron Man" },
  { id: 2, name: "Captain America" },
  { id: 3, name: "Thor" },
  { id: 4, name: "Black Widow" },
];

router.get("/api/avengers", (req, res) => {
  return res.send(avengerArray);
});

router.get("/api/avengers/:id", (req, res) => {
  // send avenger details for the requested id
  let requestedID = req.params.id;
  let avenger = avengerArray.find((avenger) => avenger.id == requestedID);
  if (!avenger) {
    return res
      .status(404)
      .send("Avenger you are looking for does not exist on the MCU");
  }
  return res.status(200).send(avenger);
});

router.put("/api/avengers/:id", (req, res) => {
  let requestedID = req.params.id;
  let avenger = avengerArray.find((avenger) => avenger.id == requestedID);
  if (!avenger) {
    return res
      .status(404)
      .send("Avenger you are looking to update does not exist on the MCU");
  }

  avenger.name = req.body.name;
  return res.send(avenger);
});

router.post("/api/avengers", (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send("Why you no send all the values in the request?");
  }

  let newAvenger = {
    id: avengerArray.length + 1,
    name: req.body.name,
  };
  avengerArray.push(newAvenger);
  return res.send(newAvenger);
});

router.delete("/api/avengers/:id", (req, res) => {
  let avenger = avengerArray.find((b) => b.id == req.params.id);
  if (!avenger) {
    res.status(404).send("The avenger you request does not exist on our MCU");
    return;
  }

  let indexOfavenger = avengerArray.indexOf(avenger);
  avengerArray.splice(indexOfavenger, 1);

  res.send(avenger);
});

module.exports = router;
