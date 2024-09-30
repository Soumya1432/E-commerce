const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/product.model");

const handleImageUpload = async(req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:"+req.file.mimetype+";base64,"+b64;
        const result = await imageUploadUtils(url);
        return res.status(200).json({
            result,
            success:true,
            message:"Image upload successfully"
        })
    } catch (error) {
        console.log(error);;
        res.status(500).json({
            success:false,
            message:"Error occured",
        })
        
    }
}

//add a new product 

const addProducts = async(req,res)=>{
    try {
        const { image, title, description, category, brand , price,salePrice, totalStock }= req.body;
        const newlyCreatedProduct = new Product({
            image, 
            title,
             description,
              category, 
              brand , 
              price,
              salePrice,
               totalStock
        })
    await newlyCreatedProduct.save();
    res.status(201).json({
        success:true,
        message:"Successfully created ",
        data:newlyCreatedProduct
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

//fetch all products

const fetchAllProducts = async(req,res)=>{
    try {
        const listOfProducts = await Product.find({})
        return res.status(200).json({
            sucees:true,
            data:listOfProducts,
            message:"Fetched"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

//edit a products

const editProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const { image, title, description, category, brand , price,salePrice, totalStock }= req.body;
        let findProduct = await Product.findById(id)       
        if(!findProduct)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"

            })
        }
        findProduct.title= title || findProduct.title;
        findProduct.description= description || findProduct.description;
        findProduct.category= category || findProduct.category;
        findProduct.brand= brand || findProduct.brand;
        findProduct.price= price === " "? 0 : price || findProduct.price;
        findProduct.salePrice= salePrice===" " ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock= totalStock || findProduct.totalStock;
        findProduct.image= image || findProduct.image;
        await findProduct.save();
        res.status(201).json({
            success:true,
            data:findProduct
        })
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
//delete a products

const deleteProduct = async(req,res)=>{
    try {
        const { id } =  req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){   
            return res.status(404).json({
                success:false,
                message:"Product not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
module.exports = { handleImageUpload,addProducts,fetchAllProducts,editProduct,deleteProduct };