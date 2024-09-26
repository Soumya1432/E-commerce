const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout, authMiddleware } = require('../../controllers/auth/auth.controller')
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logout);
router.get("/check-auth",authMiddleware ,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"Authenticated User!",
        user
    })
});

module.exports= router;