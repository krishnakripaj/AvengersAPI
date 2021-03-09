const express = require("express");
const jwt = require("jsonwebtoken");
const Avenger = require("../models/avenger");
const router = express.Router();

const SECRET_KEY = "1234567";

router.get("/", async (req, res) => {
  try {
    let avengers = await Avenger.find();
    return res.send(avengers);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.get("/:id", async (req, res) => {
  let avenger = await Avenger.findById(req.params.id);
  if (!avenger) {
    return res
      .status(404)
      .send("The avenger you request does not exist on our MCU");
  }
  return res.send(avenger);
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
  const token = req.header("x-jwt-token");
  if (!token) 
    return res.status(401).send("Access denied. No token");

  try{
    jwt.verify(token, SECRET_KEY);
  } catch(e) {
    return res.status(400).send("Invalid token");
  }

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

router.delete("/:id", async (req, res) => {
  const token = req.header("x-jwt-token");
  if (!token) 
    return res.status(401).send("Access denied. No token");

  try{
    jwt.verify(token, SECRET_KEY);
  } catch(e) {
    return res.status(400).send("Invalid token");
  }

  let decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded.isAdmin) {
    return res.status(403).send("Forbidden - No authorization");s
  }

  let avenger = await Avenger.findOneAndDelete({ _id: req.params.id });
  console.log(avenger);
  if (!avenger)
    return res
      .status(404)
      .send("The avenger you request does not exist on our MCU");

  return res.send(avenger);
});

module.exports = router;
