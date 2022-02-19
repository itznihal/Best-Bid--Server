const express = require('express');
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, getMyProducts} = require("../controllers/productController");
const router = express.Router();
require('../db/conn');


// CREATE PRODUCT ->> STORE USER ID WITH THIS

router.route("/product/new").post(createProduct);




// GET ALL PRODUCTS
router.route("/products").get(getAllProducts);
 

// READ -> UPDATE PRODUCT --> DELETE PRODUCT --> GET SINGLE PRODUCT
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

// GET MY  PRODUCTS
router.route("/products/myproducts").get(getMyProducts);







module.exports = router;