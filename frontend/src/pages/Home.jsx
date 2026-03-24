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
    
    {/* h-[100dvh] + overflow-hidden: mobile flex children get a real height so main panel can scroll */}
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-black md:h-auto md:min-h-dvh md:overflow-visible">
      <Navbar />
      {/* md: fixed 470px row = internal vertical scroll in sidebar + main (original behavior) */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-2 pb-2 md:h-[470px] md:flex-none md:flex-row md:overflow-visible md:px-2">
        <LeftSide />

        <div className="scroll-thin-brown min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-lg bg-mycolor md:mr-2 md:h-full md:flex-1">
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
            <div className="mx-2 my-2 flex flex-col gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-blue-500 p-3 text-white sm:mx-3 sm:p-4 md:my-1.5 md:flex-row md:items-center md:justify-between md:gap-3 md:p-2 md:px-4">
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-semibold leading-tight md:text-xs">Preview of EchoPlay</span>
                <p className="text-xs leading-snug text-white/90 sm:text-sm md:max-w-2xl md:text-[11px] md:leading-snug">
                  Sign up for unlimited songs and podcasts. No credit card needed.
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full bg-white px-4 py-2 text-center text-xs font-semibold text-black hover:scale-105 sm:px-5 sm:py-2.5 sm:text-sm md:px-3 md:py-1.5 md:text-xs"
              >
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
