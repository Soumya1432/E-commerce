const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../../models/user.model')


//register
const registerUser =async(req,res)=>{
    const {userName,email,password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(checkUser)
        {
            return res.status(201).json({
                success:false,
                message:"User already exist"
            })
        }
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
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const checkUser= await User.findOne({email});
        if(!checkUser) {
            return res.status(201).json({
                message:"User doesnot exist ! Register ",
                success:false
            })
        }
        const checkPassWordMatch= await bcrypt.compare(password,checkUser.password);
        if(!checkPassWordMatch){
            return res.status(201).json({
                message:"Incorrect password ",
                success:false
            })
        }

        const token = jwt.sign({
            id:checkUser._id, role:checkUser.role, email:checkUser.email
        },'soumya',{expiresIn:'60m'})
    console.log(token);
        res.cookie('token',token,{httpOnly:true, secure:false}).json({
            success:false,
            message:"Login Successful",
            user:{
                email:checkUser.email,
                role:checkUser.role,
                id:checkUser._id
            }
        })
    
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



module.exports ={ registerUser,loginUser }