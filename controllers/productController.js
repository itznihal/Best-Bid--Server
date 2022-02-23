const Product = require("../model/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

// const authenticate = require("../middleware/authenticate");
// req.rootUser
// CREATE PRODUCT -->> WORKING
exports.createProduct = catchAsyncErrors(async  (req ,res , next) => {
    console.log(`Create Product Function from Route Called`);

try {
    // HERE WE GET CURRENT TOKEN FROM JWT TOKEN
const token =  req.cookies.jwtoken;
    const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
const rootUser  = await User.findOne({ _id: verifyToken._id , "tokens.token": token});
if(!rootUser){    throw new Error('User Not Found')}
req.token = token;
req.rootUser = rootUser;
req.userID = rootUser._id;
} catch (err) {
    console.log(`error token verification`);
    res.status(401).send('Unorthorised: No token provided');
}



// console.log(ob2);

    // const product = await Product.create(req.body);

    let product = new Product(req.body);
    product.seller= req.userID;

    await product.save();

    // ADD ROW OF SELLER ID AFTER CREATION -> WE DONT HAVE  -> sSEND ID FROM FRONT END

    res.status(201).json({
        success:true,
        product
    });

});



// GET ALL PRODUCT ->> WORKING 
exports.getAllProducts = catchAsyncErrors(async (req,res, next) => {
// API FEATURE TAKES -> QUERY & QUERYSTR
    const resultPerPage = 9;
const productCount = await Product.countDocuments();
// find({ 'bidEnd': { $gt: new Date() }}) -> IF BID ENDED -> NOT SHOWN IN RESULT
    const apiFeature = new ApiFeatures(Product.find({ 'bidEnd': { $gt: new Date() }}).populate('seller', '_id name phone email').populate('bids.bidder', '_id name ') , req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

res.status(200).json({
    success:true,
    products,
    productCount,
    });

});

// UPDATE PRODUCTS  ->> WORKING 
exports.updateProduct = catchAsyncErrors(async (req , res , next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product Not Found" , 404));
     }

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
});

// TO DELETE PRODUCT -->> WORKING
exports.deleteProduct = catchAsyncErrors(async (req , res , next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product Not Found" , 404));
     }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Deleted"
    });
});




//GET MY PRODUCTS
exports.getMyProducts = catchAsyncErrors(async (req,res) => {
  
    try {
        // HERE WE GET CURRENT TOKEN FROM JWT TOKEN
    const token =  req.cookies.jwtoken;
        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
    const rootUser  = await User.findOne({ _id: verifyToken._id , "tokens.token": token});
    if(!rootUser){    throw new Error('User Not Found')}
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    } catch (err) {
        console.log(`error token verification`);
        res.status(401).send('Unorthorised: No token provided');
    }



    let myproducts = await Product.find({seller: req.userID}).populate('seller', '_id name phone').populate('bids.bidder', '_id name phone');

    console.log(`myProduct page Called`);
    res.status(200).json({
        success:true,
        myproducts
        });
    
    });





// GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req , res , next) => {

    const product = await Product.findById(req.params.id).populate('seller', ' _id name phone email').populate('bids.bidder', '_id name phone');
    const sellerDetails = product.seller;
    console.log(sellerDetails);
    
    if(!product){
       return next(new ErrorHander("Product Not Found" , 404));
    }

    res.status(200).json({
        success:true,
        product,
        sellerDetails,
    });

});