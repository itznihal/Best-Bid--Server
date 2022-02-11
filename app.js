const dotenv = require('dotenv');
const  mongoose = require('mongoose');
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.PORT;


require('./db/conn');
// const User = require('./model/userSchema');
app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));



// app.get("/", (req, res) => {
//     res.send("Home Page");
// });


// app.get("/about", (req, res) => {
//     res.send("About Page");
// });

// app.get("/profile", (req, res) => {
//     res.send("Profile Page");
// });

app.get("/service", (req, res) => {
    res.send("Services");
});

// app.get("/contact", (req, res) => {
//     res.send("cContact Page");
// });


app.get("/signin", (req, res) => {
    res.send("Signin Page");
});

app.get("/signup", (req, res) => {
    res.send("SignUp Page");
});

app.get("/addlot", (req, res) => {
    res.send("Add Lot Page");
});
app.get("/updatelot", (req, res) => {
    res.send("Updatelot Page");
});
app.get("/lot", (req, res) => {
    res.send("Updatelot Page");
});


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});