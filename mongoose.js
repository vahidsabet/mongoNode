const mongoose = require('mongoose');

const Product = require('./models/product');
const uri = 'mongodb://localhost:27017/productDB';

mongoose.connect(uri).then(()=>{
    console.log("connected");
}).catch(()=>{
    console.log("connection failed");
});

const createProduct = async (req,res,next)=> {
    const createdProduct = new Product({
        name:req.body.name,
        price:req.body.price
    });

    //save() mongoose method
    const result = await createdProduct.save();

    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products=await Product.find().exec();
    res.json(products); 

    
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;