const express = require('express');
const { handleImageUpload,addProducts,fetchAllProducts,editProduct,deleteProduct }= require('../../controllers/admin/product.controller');

const {upload } = require("../../helpers/cloudinary")

const router = express.Router();
router.post("/upload-image",upload.single("my_file"),handleImageUpload)
router.post("/add",addProducts);
router.put("/edit/:id",editProduct);
router.delete("/delete/:id",deleteProduct);
router.get("/get",fetchAllProducts);
module.exports =router;