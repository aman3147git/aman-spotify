
import React, { useEffect, useState } from "react";

import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { VscBrowser } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../axios";
import { setUser } from '../redux/userSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.appuser);
  const [isadmin, setIsadmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isopen, setIsopen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  


  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    if (user) {
      fetchadmin();
    }
  }, [user]);

  const fetchadmin = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/api/admin/check`);
      setIsadmin(data.admin); 
      
    } catch (err) {
      console.error("Error fetching admin status:", err);
      setError("Error checking admin status.");
    } finally {
      setLoading(false);
    }
  };
  const logoutHandler=async()=>{
    try {
      await axiosInstance.get(`/api/user/logout`);
      
      dispatch(setUser(null));
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
}

const handleInputChange = (e) => {
  const value = e.target.value;
  setSearchQuery(value);
  if (value) {
      navigate(`/search/${value}`);
      
  } else {
      navigate('/search/');
  }
};
const profilehandler=()=>{
  navigate('/profile');
  setIsopen(false);
}


  return (
    <div className="bg-black flex justify-between items-center">
      <h1 className="text-white text-3xl ml-7 font-bold">Echo<span className="text-green-600 font-extrabold">Play</span></h1>
      <div className="flex gap-2 items-center ml-[130px]">
      <button className="flex items-center rounded-full justify-center bg-mycolor p-1">
        <GoHome className="text-white text-4xl p-1 hover:scale-105" />
        </button>
        
        <div className="flex gap-[190px]  items-center p-2 rounded-full bg-mycolor hover:border border-gray-600 hover:bg-[#212121] w-full">
          <div className="flex gap-3 items-center w-full">
            <IoSearch className="text-gray-400 text-3xl" />
            <input
              type="text"
              className=" bg-transparent outline-none w-full text-white"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <div className="h-6 w-px bg-gray-500"></div>
            <VscBrowser className="text-gray-400 h-6 w-6" />
          </div>
        </div>
        
        </div>
      

      <div className="flex gap-4">
        {user ? (
          <>
            
            {isadmin && !loading && !error && (
              <button className="font-bold hover:scale-105 text-gray-400">
                <Link to="/admin">Dashboard</Link>
              </button>
            )}
            <div className="relative">
              <img onClick={()=>setIsopen(!isopen)} src={user.avatar} alt="A" className="rounded-full m-4 h-8 w-8  border-orange-600 border-4 hover:scale-105" />
            
            {isopen&&
            (<div className="flex flex-col absolute  bg-mycolor w-40 p-2 mt-1 right-[-0px] shadow-lg gap-3 rounded-lg text-white font-semibold z-10">
              
              
              <button onClick={logoutHandler} className="p-3 hover:bg-[#2A2A2A]">Logout</button>
              <button onClick={profilehandler} className="p-3 hover:bg-[#2A2A2A]">
              Profile
              </button>
            </div>)
            }
            </div>
          </>
        ) : (
          <>
            <button className="font-bold hover:scale-105 text-gray-400">
              <Link to="/sign-up">Sign up</Link>
            </button>
            <button className="rounded-full px-8 py-3 m-2 bg-white text-black font-bold hover:scale-105">
              <Link to="/login">Log in</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
