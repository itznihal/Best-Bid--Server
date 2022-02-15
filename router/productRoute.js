const express = require('express');
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const router = express.Router();
require('../db/conn');

// CREATE PRODUCT
router.route("/product/new").post(createProduct);


// GET ALL PRODUCTS
router.route("/products").get(getAllProducts);
 

// UPDATE PRODUCT --> DELETE PRODUCT --> GET SINGLE PRODUCT
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);







module.exports = router;