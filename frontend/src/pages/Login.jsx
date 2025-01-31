import React, { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { app } from '../firebase';
import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../axios";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Login = () => {
  const [formdata,setFormdata]=useState({email:"",password:""});
  const [passtype,setPasstype]=useState('password');
  const [loader,setLoader]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handlechange=(e)=>{
    setFormdata({
      ...formdata,
      [e.target.id]:e.target.value
    })
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    const {email,password}=formdata;
    const user={email,password};
    try {
      setLoader(true);
      const res=await axiosInstance.post(`/api/user/login`,user,{
        
        headers:{"Content-Type":"application/json"},
        withCredentials:true
      })
      
      console.log(res);
      dispatch(setUser(res.data.user));
      navigate('/');
    } catch (error) {
      console.log(error);
    }finally{
      setLoader(false);
    }

    setFormdata({email:"",password:""});
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
    <div className="bg-mycolor min-h-screen flex justify-center items-center">
      <div className="bg-[#121212] w-[750px] rounded-lg shadow-lg px-8 py-10 my-8">
        
        <div className="flex flex-col items-center mb-8">
          <Link to="/"><h1 className="text-4xl mb-3 font-bold text-white">Echo<span className="text-green-600">Play</span></h1></Link>
          
          <h1 className="text-white font-extrabold text-3xl">Log in to EchoPlay</h1>
        </div>
     
        
        <div className="flex flex-col gap-3 mb-10 items-center justify-center">
          <button onClick={GoogleHandler} className="w-[340px] text-white font-bold px-4 py-3 border border-gray-400 rounded-full flex items-center justify-center gap-12 hover:border-white">
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>
          
        </div>

        
        <div className="flex items-center gap-4 text-gray-700 mb-10">
          <hr className="border-t border-gray-700 flex-1" />
        </div> 
          
        

        
        <form onSubmit={submitHandler} className="mb-10">
          <div className="flex flex-col gap-4 mb-6 items-center justify-center">
            <div className="flex flex-col">
              <label className="text-white text-sm font-bold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
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
          <button className=" w-[340px] text-black font-bold px-4 py-3 bg-green-500 rounded-full hover:bg-green-400 hover:scale-105 duration-75">
            Log In
          </button>
          </div>
        </form>
        
        
        <div className="text-center text-gray-400 text-md mt-6 font-md ">
        
          <p className="mt-6">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-gray-300 font-bold underline cursor-pointer hover:text-green-600">
              Sign up for Spotify.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



