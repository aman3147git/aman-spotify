
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
    <header className="z-30 shrink-0 border-b border-white/10 bg-black">
      <div className="flex flex-col gap-3 px-3 py-3 sm:px-4 md:flex-row md:items-center md:gap-4 md:py-2 lg:px-6">
        <div className="flex items-center justify-between gap-3 md:min-w-0 md:max-w-[200px] lg:max-w-none">
          <Link to="/" className="min-w-0 shrink-0" onClick={() => setIsopen(false)}>
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Echo<span className="font-extrabold text-green-600">Play</span>
            </h1>
          </Link>
          <div className="flex items-center gap-2 md:hidden">
            {user ? (
              <>
                {isadmin && !loading && !error && (
                  <Link to="/admin" className="text-sm font-bold text-gray-400 hover:scale-105">
                    Dashboard
                  </Link>
                )}
                <div className="relative">
                  <img
                    onClick={() => setIsopen(!isopen)}
                    src={user.avatar}
                    alt=""
                    className="h-9 w-9 cursor-pointer rounded-full border-2 border-orange-600 hover:scale-105 sm:h-10 sm:w-10"
                  />
                  {isopen && (
                    <div className="absolute right-0 z-50 mt-2 flex w-40 flex-col gap-1 rounded-lg bg-mycolor p-2 text-sm font-semibold text-white shadow-lg">
                      <button type="button" onClick={logoutHandler} className="rounded-md p-3 text-left hover:bg-[#2A2A2A]">
                        Logout
                      </button>
                      <button type="button" onClick={profilehandler} className="rounded-md p-3 text-left hover:bg-[#2A2A2A]">
                        Profile
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/sign-up" className="text-sm font-bold text-gray-400 hover:text-white">
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black hover:scale-105"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2 md:max-w-2xl md:justify-center lg:mx-4 lg:max-w-3xl">
          <Link
            to="/"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mycolor hover:border hover:border-gray-600 md:h-11 md:w-11"
            onClick={() => setIsopen(false)}
            aria-label="Home"
          >
            <GoHome className="text-2xl text-white hover:scale-105 md:text-4xl md:p-1" />
          </Link>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-mycolor p-2 hover:border hover:border-gray-600 md:p-2.5">
            <IoSearch className="shrink-0 text-2xl text-gray-400 md:text-3xl" />
            <input
              type="search"
              className="w-full min-w-0 bg-transparent text-sm text-white caret-white outline-none placeholder:text-gray-500 sm:text-base"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <div className="hidden items-center gap-3 sm:flex">
              <div className="hidden h-6 w-px bg-gray-500 md:block" />
              <VscBrowser className="hidden h-6 w-6 shrink-0 text-gray-400 md:block" />
            </div>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-3 md:flex md:shrink-0 lg:gap-4">
          {user ? (
            <>
              {isadmin && !loading && !error &&
                <Link to="/admin" className="whitespace-nowrap text-sm font-bold text-gray-400 hover:scale-105 hover:text-white lg:text-base">
                  Dashboard
                </Link>
              }
              <div className="relative">
                <img
                  onClick={() => setIsopen(!isopen)}
                  src={user.avatar}
                  alt=""
                  className="h-9 w-9 cursor-pointer rounded-full border-4 border-orange-600 hover:scale-105"
                />
                {isopen && (
                  <div className="absolute right-0 z-50 mt-2 flex w-40 flex-col gap-1 rounded-lg bg-mycolor p-2 font-semibold text-white shadow-lg">
                    <button type="button" onClick={logoutHandler} className="rounded-md p-3 text-left hover:bg-[#2A2A2A]">
                      Logout
                    </button>
                    <button type="button" onClick={profilehandler} className="rounded-md p-3 text-left hover:bg-[#2A2A2A]">
                      Profile
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/sign-up" className="whitespace-nowrap font-bold text-gray-400 hover:scale-105 hover:text-white">
                Sign up
              </Link>
              <Link
                to="/login"
                className="rounded-full bg-white px-6 py-2.5 font-bold text-black hover:scale-105"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
