const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        let salt = await bcrypt.genSalt(10);
        let hashedpw = await bcrypt.hash(req.body.password, salt);

        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpw
        });
        user = await user.save();
        console.log(user);
        return res.send({
            username: user.username,
            email: user.email
        });
    } catch (error) {
        return res.status(500).send(error.message)
    }

})

module.exports = router;