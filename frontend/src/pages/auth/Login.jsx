import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState ={
    email:"",
    password:"",
}
const AuthLogin =()=>{
    const [formData,setFormData]= useState(initialState);
    const dispatch= useDispatch();

    const { toast } = useToast();


    function onSubmit(event) {
        event.preventDefault();
    
        dispatch(loginUser(formData)).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: data?.payload?.message,
            });
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        });
      }
    return(
        <div className="mx-auto w-full max-w-md space-y-6 border border-slate-300 px-8 py-20 shadow-lg rounded-lg">
         <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back! to Sign in</h1>
            <p className="mt-2"> Dont't have an account ?
            <Link className="font-medium text-primary underline" to={'/auth/register'}>Register Now</Link>
            </p>
         </div>
         <CommonForm
          formControls={loginFormControls}
          buttonText={'Sign in'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
         />
     </div>
    )
}
export default AuthLogin;










