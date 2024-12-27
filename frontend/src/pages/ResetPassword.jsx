import React from "react";
import { SlSocialSpotify } from "react-icons/sl";

const ResetPassword = () => {
  
  return (
    <div className="bg-[#121212] min-h-screen flex justify-center ">
    <div className=" rounded-lg shadow-lg px-8 py-10 my-3 ">
      
        <div className="flex flex-col items-center mb-6 text-white ">
          <SlSocialSpotify className="text-white text-4xl mb-3 " />
          <h1 className="font-extrabold text-3xl mb-2">Reset your password</h1>
          <p className="">
          Enter the email address linked
          </p>
          <p>to your Spotify account and we'll send you an </p>
          <p className="">email.</p>
        </div>
        <form className="">
        <div className="flex flex-col mb-6">
        <label className="text-white text-sm font-bold">
                Email address
              </label>
          <input
            type="email"
            
            className="w-[340px] mt-2 px-4 py-3 bg-transparent  text-white rounded border border-gray-400 hover:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          
        </div>
        <p className="text-white hover:text-green-500 font-md mb-6 underline">Need support?</p>
        <button type='submit' className='p-3 bg-green-500 w-[340px] rounded-full text-black font-bold hover:bg-green-600'>Send Link</button>
        
      </form>
      </div>
    </div>
  );
};

export default ResetPassword;
