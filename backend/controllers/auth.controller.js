const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../models/user.model')


//register
const registerUser =async(req,res)=>{
    const {userName,email,password} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,
            email,
            password:hashPassword
        })
        await newUser.save();
        res.status(200).json({
            success:true,
            message:"Registration successfull"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Invalid authentication"
        })
    }
}

//login
const login =async(req,res)=>{
    const {email,password} = req.body;
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Invalid authentication"
        })
    }
}

//logout


//authmiddleware



module.exports ={ registerUser }