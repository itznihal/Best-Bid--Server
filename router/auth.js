const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");


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
        } else if (password != cpassword) {
            return res.status(450).json({ error: "password is not matching" })

        } else {

            const user = new User({ name, email, phone, password, cpassword });

            // Hashing is Used


            await user.save();

            res.status(201).json({ message: " User register successfuly" });


        }



    } catch (err) {

        console.log(err);
    }




});


//signin

router.post('/signin', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "invalid credentials" });
        }

        const userLogin = await User.findOne({ email: email });


        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);





            if (!isMatch) {
                res.status(400).json({ error: "invalid credential" });
            } else {
                token = await userLogin.generateAuthToken();
                console.log(token);
                
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                res.json({ message: "user sign in successfully" })
            }
        } else {
            res.status(400).json({ error: "Invalid Credential" })
        }




    } catch (err) {
        console.log(err);
    }

});




// ABOUT US PAGE ROUTE
// we have to use authenticatrion middleware at about page -> inserting authenticate function inside thi app.get function

router.get('/about', authenticate , (req, res) => {
    console.log(`about us page`);
    // req.rootUser -> Sending Currently logged in person profile 
    res.send(req.rootUser);
});



// FOR GET USERDATA

router.get('/getdata', authenticate , (req, res) => {
    console.log(`about us page`);
    // req.rootUser -> Sending Currently logged in person profile 
    res.send(req.rootUser);
});



module.exports = router;