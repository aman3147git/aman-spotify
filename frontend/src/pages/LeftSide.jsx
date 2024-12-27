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
    
      <div className="bg-mycolor rounded-lg w-[285px] mx-2 h-[470px]">
        <div className="text-gray-400 flex justify-between p-5 items-center">
          <div className="relative group w-fit">
            <div className="flex gap-2 hover:text-white">
              <BiLibrary className="text-2xl" />
              <h1 className="font-bold">Your Library</h1>
            </div>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-mycolor text-white text-sm rounded shadow opacity-0 group-hover:opacity-100 transition">
              Collapse Your Library
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
          <div className="  h-[406px] overflow-y-scroll p-4 rounded-md flex flex-col gap-4 ">
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
          <div className=" h-48 overflow-y-scroll p-4 rounded-md flex flex-col gap-6">
            {list.map((item, index) => (
              <div
                key={index}
                className="bg-[#313131] rounded-lg flex flex-col  p-4 "
              >
                <h1 className="font-bold text-white mt-2">{item.title}</h1>
                <p className="font-md text-white text-sm">{item.description}</p>
                <button className="bg-white py-2 text-black font-semibold rounded-full my-2 hover:scale-105">
                  {item.press}
                </button>
              </div>
            ))}
          </div>
        )}

        {user ? (
          ""
        ) : (
          <div className="flex flex-col text-gray-300 mt-8 mx-6">
            <div className="flex gap-2">
              <Link
                to="https://www.spotify.com/in-en/legal/end-user-agreement/"
                className="text-gray-400 text-sm"
              >
                Legal
              </Link>
              <Link to="" className="text-gray-400 text-sm">
                Safety&Privacy Center
              </Link>
            </div>
            <br />
            <div className="flex gap-2">
              <Link to="" className="text-gray-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="" className="text-gray-400 text-sm">
                Cookies
              </Link>
              <Link to="" className="text-gray-400 text-sm">
                About Ads
              </Link>
            </div>
            <br />
            <Link to="" className="text-gray-400 text-sm">
              Accessibility
            </Link>
            <br />
            <Link
              to="https://www.spotify.com/in-en/legal/cookies-policy/"
              className="text-white text-sm hover:underline"
            >
              Cookies
            </Link>
          </div>
        )}
      </div>
    
  );
};

export default LeftSide;
