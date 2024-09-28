const express= require('express');
const mongoose= require('mongoose');
const cookieParser = require("cookie-parser");
const cors= require('cors');
const authRouter = require('./routes/auth/auth.route')
const adminProductsRouter = require('./routes/admin/products.route');
const dotenv= require('dotenv')
dotenv.config();
const app =express();

mongoose.connect("mongodb://localhost:27017/e-commerce")
.then(()=>{
    console.log("Mongodb connected successfully")
})
.catch((error)=>{
    console.log("Erreor",error);
})
const PORT= process.env.port||3000;

app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials:true
              
}))

app.use(cookieParser())
app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/api/admin/products",adminProductsRouter);
app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})