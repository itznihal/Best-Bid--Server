const Product = require("../model/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



// CREATE PRODUCT -->> WORKING
exports.createProduct = catchAsyncErrors(async (req ,res , next) => {
    console.log(`Create Product Function from Route Called`);

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });

});

// GET ALL PRODUCT ->> WORKING 
exports.getAllProducts = catchAsyncErrors(async (req,res) => {
// API FEATURE TAKES -> QUERY & QUERYSTR
    const resultPerPage = 6;
const productCount = await Product.countDocuments();
// find({ 'bidEnd': { $gt: new Date() }}) -> IF BID ENDED -> NOT SHOWN IN RESULT
    const apiFeature = new ApiFeatures(Product.find().populate('seller', '_id name phone').populate('bids.bidder', '_id name phone') , req.query)
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


// GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req , res , next) => {

    const product = await Product.findById(req.params.id).populate('seller', '_id name').populate('bids.bidder', '_id name phone');

    
    if(!product){
       return next(new ErrorHander("Product Not Found" , 404));
    }

    res.status(200).json({
        success:true,
        product
    });

});