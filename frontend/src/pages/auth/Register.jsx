import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState ={
    username:"",
    email:"",
    password:""
}
const AuthRegsiter =()=>{
    const [formData,setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast}=useToast();
function onSubmit(event){
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
        if(data?.payload?.success) {
            toast({
                title:data?.payload?.message,
            })
            navigate('/auth/login')
        }
        else
        {
            toast({
                title:data?.payload?.message,
                variant:'success'
            })
           
        }
    })
     
}

    return(
     <div className="mx-auto w-full max-w-md space-y-6 border border-slate-300 px-8 py-20 shadow-lg rounded-lg">
         <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create a new Account</h1>
            <p className="mt-2"> Already have an account?
            <Link className="font-medium text-primary underline" to={'/auth/login'}>Login</Link>
            </p>
         </div>
         
         <CommonForm 
          formControls={registerFormControls}
          buttonText={'Create Account'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
         />
         
     </div>
    )
}
export default AuthRegsiter;