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
    
      <div className="mx-0 flex min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-lg bg-mycolor max-h-[min(50vh,440px)] md:mx-2 md:h-full md:max-h-none md:w-[285px]">
        <div className="flex shrink-0 items-center justify-between p-4 text-gray-400 sm:p-5">
          <div className="relative group w-fit">
            <div className="flex gap-2 hover:text-white">
              <BiLibrary className="text-2xl" />
              <h1 className="font-bold">All Albums</h1>
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
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4 md:h-[406px] md:flex-none md:overflow-y-scroll">
            {Array.isArray(albumsData) && albumsData.length > 0 && albumsData.map((item, index) => (
              <div
                onClick={()=>handleAlbum(item._id)}
                key={index}
                className=" flex gap-2 hover:bg-[#2A2A2A] rounded-md"
              >
                <img src={item.imageUrl} className="h-16 w-16 rounded-lg" alt="" />
                <div className="flex flex-col gap-1">
                <h1 className="font-lg text-white mt-2">{item.title}</h1>
                <p className=" text-gray-400 text-sm">{item.artist}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain p-4 md:h-[406px] md:flex-none md:overflow-y-scroll">
            {list.map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg bg-[#313131]  p-4 "
              >
                <h1 className="mt-2 font-bold text-white">{item.title}</h1>
                <p className="font-md text-sm text-white">{item.description}</p>
                <button className="my-2 rounded-full bg-white py-2 font-semibold text-black hover:scale-105">
                  {item.press}
                </button>
              </div>
            ))}
            <div className="mx-2 flex flex-col text-gray-300">
              <div className="flex gap-2">
                <Link
                  to="https://www.spotify.com/in-en/legal/end-user-agreement/"
                  className="text-sm text-gray-400"
                >
                  Legal
                </Link>
                <Link to="" className="text-sm text-gray-400">
                  Safety&Privacy Center
                </Link>
              </div>
              <br />
              <div className="flex gap-2">
                <Link to="" className="text-sm text-gray-400">
                  Privacy Policy
                </Link>
                <Link to="" className="text-sm text-gray-400">
                  Cookies
                </Link>
                <Link to="" className="text-sm text-gray-400">
                  About Ads
                </Link>
              </div>
              <br />
              <Link to="" className="text-sm text-gray-400">
                Accessibility
              </Link>
              <br />
              <Link
                to="https://www.spotify.com/in-en/legal/cookies-policy/"
                className="text-sm text-white hover:underline"
              >
                Cookies
              </Link>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default LeftSide;
