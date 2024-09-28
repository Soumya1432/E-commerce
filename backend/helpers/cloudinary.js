const cloudinary = require('cloudinary');
const multer = require('multer');
const dotenv= require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

const storage = new multer.memoryStorage();
async function imageUploadUtils(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto',

    })
    return result;
}

const upload = multer({storage});
module.exports = { upload,imageUploadUtils}