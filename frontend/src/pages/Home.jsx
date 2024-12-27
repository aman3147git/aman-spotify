import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";


import { Outlet } from "react-router-dom";
import LeftSide from "./LeftSide";
import Player from "./Player";
// import axiosInstance from "../axios";
import { useSelector } from "react-redux";
import {  Link } from "react-router-dom";


const Home = () => {
  // const [songsData, setSongsData] = useState([]);
  const { user } = useSelector((state) => state.appuser);

  // useEffect(() => {
  //   fetchSongs();
  // }, []);
  // const fetchSongs = async () => {
  //   try {
  //     const { data } = await axiosInstance.get("/api/song/get");
  //     setSongsData(data);
  //   } catch (err) {
  //     console.log("Error fetching songs.");
  //   }
  // };

  return (
    
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex h-[470px] justify-between">
        <LeftSide />

        <div className=" h-[470px] overflow-y-auto bg-mycolor rounded-lg mr-2 flex-1">
        
            
        <Outlet context={{ user }} />
            
        </div>
      </div>
      {user ? (
        <div className=" h-[90px] text-white">
          <Player />
        </div>
      ) : (
        <div className="h-[90px] ">
          <Link to="/sign-up">
            <div className="flex justify-between items-center text-white p-3 bg-gradient-to-r from-pink-600 to-blue-500 m-3">
              <div className="flex flex-col">
                <h1 className="font-semibold">Preview of Spotify</h1>
                <p>
                  Sign up to get unlimited songs and podcasts with occasional
                  ads.No credit card needed.
                </p>
              </div>
              <button className="text-black p-3 bg-white rounded-full font-semibold hover:scale-105">
                Sign up free
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
    
  );
};

export default Home;
