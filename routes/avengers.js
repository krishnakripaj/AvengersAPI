const express = require("express");
const Avenger = require("../models/avenger");
const router = express.Router();

let avengerArray = [
  { id: 1, name: "Iron Man" },
  { id: 2, name: "Captain America" },
  { id: 3, name: "Thor" },
  { id: 4, name: "Black Widow" },
];

router.get("/", async (req, res) => {
  try {
    let avengers = await Avenger.find().countDocuments();
    return res.send(avengers.toString());
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.get("/:id", (req, res) => {
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

router.put("/:id", async (req, res) => {
  let requestedID = req.params.id;
  let avenger = await Avenger.findById(requestedID);

  if (!avenger) {
    return res
      .status(404)
      .send("Avenger you are looking to update does not exist on the MCU");
  }

  avenger.set({ likeCount: req.body.likeCount });
  avenger = await avenger.save();

  return res.send(avenger);
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send("Why you no send all the values in the request?");
  }

  let newavenger = new Avenger({
    name: req.body.name,
    birthName: req.body.birthName,
    movies: req.body.movies,
    likeCount: req.body.likeCount,
    imgUrl: req.body.imgUrl,
    deceased: req.body.deceased,
  });
  try {
    newavenger = await newavenger.save();
    return res.send(newavenger);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", (req, res) => {
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
