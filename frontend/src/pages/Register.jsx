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
      
      console.log(res);
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
      console.log(result);
      
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
    <div className="bg-[#121212] min-h-screen flex justify-center items-center">
      <div className=" rounded-lg shadow-lg px-8 py-10 my-4">
        
        <div className="flex flex-col items-center mb-8">
        <Link to="/"><h1 className="text-4xl mb-3 font-bold text-white">Echo<span className="text-green-600">Play</span></h1></Link>
          
          <h1 className="text-white font-bold text-5xl">Sign up to</h1>
          <h1 className="text-white font-bold text-5xl">start listening</h1>
        </div>

        <form className="mb-10" onSubmit={submitHandler}>
          <div className="flex flex-col gap-4 mb-6 ">
          <div className="flex flex-col ">
              <label className="text-white text-sm font-bold">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Full Name"
                onChange={handlechange} value={formdata.fullname}
                className="w-[340px] mt-2 px-4 py-3 bg-transparent  text-white rounded border border-gray-400 hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-white text-sm font-bold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@domain.com"
                onChange={handlechange} value={formdata.email}
                className="w-[340px] mt-2 px-4 py-3 bg-transparent  text-white rounded border border-gray-400 hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-white text-sm font-bold">
                Password
              </label>
              <div className="relative">
              <input
                type={passtype}
                id="password"
                placeholder="Password"
                onChange={handlechange} value={formdata.password}
                className="w-[340px] mt-2 px-4 py-3 bg-transparent text-white rounded border border-gray-400 hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button className='absolute inset-y-5 right-2 text-gray-300 hover:text-white text-2xl hover:scale-105' type='button' onClick={()=>setPasstype(passtype==='password'?'text':'password')}>{passtype==='password'?<FaLock/>:<FaLockOpen/>}</button>
              
              </div>
            </div>
            
          </div>

          <div className="flex items-center justify-center">
          <button className=" w-[340px] text-black font-bold px-4 py-3 bg-green-500 rounded-full hover:bg-green-400 ">
            Submit
          </button>
          </div>
        </form>

        

        
        <div className="flex items-center gap-4 text-white mb-10">
          <hr className="border-t border-gray-700 flex-1" />
          or
          <hr className="border-t border-gray-700 flex-1" />
        </div> 
          
        <div className="flex flex-col gap-3 mb-10 items-center justify-center">
          <button onClick={GoogleHandler} className="w-[340px] text-white font-bold px-4 py-3 border border-gray-400 rounded-full flex items-center justify-center gap-12 hover:border-white">
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



