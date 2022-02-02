const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Router js is called`);
});

router.post('/register', async (req, res) => {

    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(450).json({ error: "Fill all Require Feild Properly " });
    }

    try {

        const userExist = await User.findOne({ email: email });



        if (userExist) {
            return res.status(450).json({ error: "Email already exist" });
        }

        const user = new User({ name, email, phone, password, cpassword });

// Hashing is Used


        await user.save();

        res.status(201).json({ message: " User register successfuly" });


    } catch (err) {

        console.log(err);
    }




});


//signin

router.post('/signin', async (req, res) => {
    console.log(req.body);
    res.json({ message: "Awesome" });

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "invalid credentials" });
        }

        const userLogin = await User.findOne({ email: email });




    } catch (err) {
        console.log(err);
    }

});

module.exports = router;