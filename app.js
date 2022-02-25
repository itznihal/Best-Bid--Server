const dotenv = require('dotenv');
const  mongoose = require('mongoose');
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.PORT;


require('./db/conn');


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// const User = require('./model/userSchema');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(fileUpload());

// HANDLING UNCAUGHT EXCEPTION -> CONSOLE.LOG(UNDEFINE VARIABLE)
process.on("uncaughtException" , err => {
    console.log(`Error : ${err}`);
    console.log(` Server is closing due to Handling Uncaught Error Exception`);

});


// ROUTERS
app.use(require('./router/auth'));
app.use(require('./router/productRoute'));

// MIDDLEWARE FOR ERRORS
app.use(require('./middleware/error'));




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


// app.get("/signin", (req, res) => {
//     res.send("Signin Page");
// });

// app.get("/signup", (req, res) => {
//     res.send("SignUp Page");
// });

// app.get("/addlot", (req, res) => {
//     res.send("Add Lot Page");
// });
// app.get("/updatelot", (req, res) => {
//     res.send("Updatelot Page");
// });
// app.get("/lot", (req, res) => {
//     res.send("Updatelot Page");
// });


const server = app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});


// UNHANDLED PROMISE REJECTION ->> IF .ENV CONFIG FILE CHANGE
process.on("unhandledRejection" , err => {
    console.log(`Error : ${err.message}`);
    console.log(`Config file problem sutting down server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
})