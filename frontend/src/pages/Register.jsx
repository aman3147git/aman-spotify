import React, { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { app } from '../firebase';
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import axiosInstance from "../axios.js";
import { setUser } from "../redux/userSlice.js";

const Register = () => {
  const [formdata,setFormdata]=useState({fullname:"",email:"",password:""});
  const [passtype,setPasstype]=useState('password');
  const [loader,setLoader]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handlechange=(e)=>{
    setFormdata({
      ...formdata,
      [e.target.id]:e.target.value
    })
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    
    try {
      setLoader(true);
      const res=await axiosInstance.post(`/api/user/register`,formdata,{
        
        headers:{"Content-Type":"application/json"},
        withCredentials:true
        
      });
      
      
      navigate('/login');
    } catch (error) {
      console.log(error);
    }finally{
      setLoader(false);
    }
    
  }
  
  const GoogleHandler=async()=>{
    try{
      const provider=new GoogleAuthProvider();
      const auth=getAuth(app);
      const result=await signInWithPopup(auth,provider);
      
      
      const res=await axiosInstance.post(`/api/user/google`,
        {
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
        },
        {
        headers:{"Content-Type":"application/json"},
        withCredentials:true,
        },
        

  );
  const data=await res.data;
  dispatch(setUser(data));
  navigate('/');
}catch(error){
  console.log(error);
  
}
  }
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#121212] px-4 py-8">
      <div className="my-4 w-full max-w-lg rounded-lg px-5 py-8 shadow-lg sm:px-8 sm:py-10">
        
        <div className="mb-8 flex flex-col items-center text-center">
        <Link to="/"><h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">Echo<span className="text-green-600">Play</span></h1></Link>
          
          <h2 className="text-3xl font-bold text-white sm:text-5xl">Sign up to</h2>
          <h2 className="text-3xl font-bold text-white sm:text-5xl">start listening</h2>
        </div>

        <form className="mb-10" onSubmit={submitHandler}>
          <div className="mb-6 flex flex-col gap-4">
          <div className="mx-auto flex w-full max-w-[340px] flex-col">
              <label htmlFor="fullname" className="text-sm font-bold text-white">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Full Name"
                onChange={handlechange} value={formdata.fullname}
                className="mt-2 w-full rounded border border-gray-400 bg-transparent px-4 py-3 text-white hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
            <div className="mx-auto flex w-full max-w-[340px] flex-col">
              <label htmlFor="email" className="text-sm font-bold text-white">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@domain.com"
                onChange={handlechange} value={formdata.email}
                className="mt-2 w-full rounded border border-gray-400 bg-transparent px-4 py-3 text-white hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
            <div className="mx-auto flex w-full max-w-[340px] flex-col">
              <label htmlFor="password" className="text-sm font-bold text-white">
                Password
              </label>
              <div className="relative">
              <input
                type={passtype}
                id="password"
                placeholder="Password"
                onChange={handlechange} value={formdata.password}
                className="mt-2 w-full rounded border border-gray-400 bg-transparent px-4 py-3 pr-12 text-white hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button className="absolute bottom-2 right-2 text-2xl text-gray-300 hover:scale-105 hover:text-white" type="button" onClick={()=>setPasstype(passtype==='password'?'text':'password')}>{passtype==='password'?<FaLock/>:<FaLockOpen/>}</button>
              
              </div>
            </div>
            
          </div>

          <div className="flex items-center justify-center">
          <button type="submit" className="w-full max-w-[340px] rounded-full bg-green-500 px-4 py-3 font-bold text-black hover:bg-green-400">
            Submit
          </button>
          </div>
        </form>

        

        
        <div className="mb-10 flex items-center gap-4 text-white">
          <hr className="flex-1 border-t border-gray-700" />
          <span className="shrink-0 text-sm text-gray-400">or</span>
          <hr className="flex-1 border-t border-gray-700" />
        </div> 
          
        <div className="mb-10 flex flex-col items-center justify-center gap-3">
          <button type="button" onClick={GoogleHandler} className="flex w-full max-w-[340px] items-center justify-center gap-4 rounded-full border border-gray-400 px-4 py-3 font-bold text-white hover:border-white sm:gap-12">
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>
          
          
        </div>

        <div className="flex items-center gap-4 text-gray-300 mb-10">
          <hr className="border-t border-gray-700 flex-1" />
        
        </div>
        
        
        
        <div className="text-center text-gray-400 text-md mt-6 font-md">
        
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-gray-300 font-bold underline cursor-pointer">
              Log in here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;



