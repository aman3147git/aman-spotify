import React from "react";
import Navbar from "../components/Navbar";


import { Outlet } from "react-router-dom";
import LeftSide from "./LeftSide";
import Player from "./Player";

import { useSelector } from "react-redux";
import {  Link } from "react-router-dom";


const Home = () => {
  
  const { user } = useSelector((state) => state.appuser);

  

  return (
    
    <div className="bg-black min-h-dvh flex flex-col">
      <Navbar />
      {/* md: fixed 470px row = internal vertical scroll in sidebar + main (original behavior) */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 px-2 pb-2 md:h-[470px] md:flex-none md:flex-row md:px-2">
        <LeftSide />

        <div className="flex-1 min-h-[220px] overflow-y-auto overscroll-contain rounded-lg bg-mycolor md:mr-2 md:h-full md:min-h-0 md:flex-1">
        <Outlet context={{ user }} />
        </div>
      </div>
      {user ? (
        <div className="shrink-0 text-white">
          <Player />
        </div>
      ) : (
        <div className="shrink-0">
          <Link to="/sign-up">
            <div className="m-2 flex flex-col gap-3 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500 p-4 text-white sm:m-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex min-w-0 flex-col gap-1">
                <h1 className="font-semibold">Preview of EchoPlay</h1>
                <p className="text-sm sm:text-base">
                  Sign up to get unlimited songs and podcasts with occasional
                  ads. No credit card needed.
                </p>
              </div>
              <button type="button" className="shrink-0 rounded-full bg-white px-5 py-3 text-center font-semibold text-black hover:scale-105">
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
