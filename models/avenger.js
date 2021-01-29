const mongoose = require("mongoose");

const avengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  birthName: String,
  movies: {
    type: [String],
    enum: ["Infinity War", "Endgame", "Iron Man 2", "First Avenger"],
    required: true,
  },
  likeCount: Number,
  imgUrl: {
    type: String,
    default:
      "https://p1.hiclipart.com/preview/707/869/118/the-a-avengers-logo-png-clipart.jpg",
  },
  deceased: Boolean,
});

const Avenger = mongoose.model("Avenger", avengerSchema);

module.exports = Avenger;
