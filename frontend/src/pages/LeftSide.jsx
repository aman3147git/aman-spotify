import React, { useEffect, useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const LeftSide = () => {
  const [albumsData, setAlbumsData] = useState([]);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  const { user } = useSelector((state) => state.appuser);
  const navigate = useNavigate();
  const list = [
    {
      title: "Create your first playlist",
      description: "It's easy,we'll help you",
      press: "Create playlist",
    },
    {
      title: "Let's find some podcasts to follow",
      description: "We'll keep you updated on new episodes",
      press: "Browse podcasts",
    },
  ];
  useEffect(() => {
      
      fetchAlbums();
    }, []);
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/album/get");
      setAlbumsData(data);
    } catch (err) {
      setError("Error fetching albums.");
    } finally {
      setLoading(false);
    }
  };

  const handleAlbum=(id)=>{
    navigate(`/album/${id}`);
  }
  return (
    
      <div className="mx-0 flex min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-lg bg-mycolor max-h-[min(30vh,200px)] sm:max-h-[min(34vh,240px)] md:mx-2 md:h-full md:max-h-none md:w-[285px]">
        <div className="flex shrink-0 items-center justify-between px-3 py-2 text-gray-400 sm:px-4 sm:py-3 md:p-5">
          <div className="relative group w-fit">
            <div className="flex items-center gap-1.5 hover:text-white sm:gap-2">
              <BiLibrary className="text-xl sm:text-2xl" />
              <h1 className="text-sm font-bold sm:text-base">All Albums</h1>
            </div>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-mycolor text-white text-sm rounded shadow opacity-0 group-hover:opacity-100 transition">
              Collapse All Albums
            </div>
          </div>
          <div className="relative group w-fit">
            <FaPlus />
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-mycolor text-white text-sm rounded shadow opacity-0 group-hover:opacity-100 transition">
              Create playlist or folder
            </div>
          </div>
        </div>

        {user ? (
          <div className="scroll-thin-brown flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-2 py-2 sm:gap-3 sm:p-3 md:h-[406px] md:flex-none md:gap-4 md:overflow-y-scroll md:p-4">
            {Array.isArray(albumsData) && albumsData.length > 0 && albumsData.map((item, index) => (
              <div
                onClick={()=>handleAlbum(item._id)}
                key={index}
                className="flex gap-2 rounded-md hover:bg-[#2A2A2A]"
              >
                <img src={item.imageUrl} className="h-11 w-11 shrink-0 rounded-md object-cover sm:h-14 sm:w-14 md:h-16 md:w-16 md:rounded-lg" alt="" />
                <div className="flex min-w-0 flex-col gap-0.5">
                <h2 className="truncate text-sm font-semibold text-white sm:text-base md:mt-2">{item.title}</h2>
                <p className="truncate text-xs text-gray-400 sm:text-sm">{item.artist}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="scroll-thin-brown flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-2 py-2 sm:gap-4 sm:p-3 md:h-[406px] md:flex-none md:gap-6 md:overflow-y-scroll md:p-4">
            {list.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg bg-[#313131] p-2.5 sm:p-3 md:p-4"
              >
                <h2 className="mt-1 text-sm font-bold text-white sm:text-base md:mt-2">{item.title}</h2>
                <p className="text-xs text-white sm:text-sm">{item.description}</p>
                <button type="button" className="my-1.5 rounded-full bg-white py-1.5 text-xs font-semibold text-black hover:scale-105 sm:my-2 sm:py-2 sm:text-sm">
                  {item.press}
                </button>
              </div>
            ))}
            <div className="mx-1 mt-5 flex flex-col gap-2 text-gray-300 md:mt-3 md:gap-1">
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <Link
                  to="https://www.spotify.com/in-en/legal/end-user-agreement/"
                  className="text-xs text-gray-400 hover:underline md:text-[10px]"
                >
                  Legal
                </Link>
                <Link to="" className="text-xs text-gray-400 hover:underline md:text-[10px]">
                  Safety & Privacy
                </Link>
                <Link to="" className="text-xs text-gray-400 hover:underline md:text-[10px]">
                  Privacy Policy
                </Link>
                <Link to="" className="text-xs text-gray-400 hover:underline md:text-[10px]">
                  Cookies
                </Link>
                <Link to="" className="text-xs text-gray-400 hover:underline md:text-[10px]">
                  About Ads
                </Link>
                <Link to="" className="text-xs text-gray-400 hover:underline md:text-[10px]">
                  Accessibility
                </Link>
                <Link
                  to="https://www.spotify.com/in-en/legal/cookies-policy/"
                  className="text-xs text-white hover:underline md:text-[10px]"
                >
                  Cookie settings
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default LeftSide;
