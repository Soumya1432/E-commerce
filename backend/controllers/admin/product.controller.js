const { imageUploadUtils } = require("../../helpers/cloudinary");

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

module.exports = { handleImageUpload };