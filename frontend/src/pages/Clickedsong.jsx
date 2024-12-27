import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSong,playPause } from "../redux/songSlice";


const Clickedsong = () => {
  
  
  const { id } = useParams();
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const {currentSong, currentSongId, isPlaying } = useSelector((state) => state.song);

  const handlePlayPause = (e) => {
    e.stopPropagation();

    if (currentSongId === currentSong._id) {
      dispatch(playPause());
    } else {
      dispatch(setSong({ currentSong, songId: currentSong._id }));
    }
  };
  
  
  useEffect(() => {
    fetchSongDetails();
  }, [id]);
  
  const fetchSongDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/api/song/${id}`);
      dispatch(setSong({ song: data, songId: data._id }));
    } catch (err) {
      setError("Error fetching song details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[#2A2A2A]">
      {currentSong ? (
        <div className="flex flex-col">
          <div className="flex h-[220px] bg-gradient-to-r from-green-900 to-slate-300">
            <div className="pl-5 pt-12 flex gap-3">
              <div className="">
                <img
                  src={currentSong.imageUrl}
                  alt={currentSong.artist}
                  className="w-[170px] h-[170px] object-cover rounded-lg hover:scale-105"
                />
              </div>
              <div className="">
                <h1 className="text-white text-6xl font-bold mt-14">
                  {currentSong.title}
                </h1>
                <div className="flex gap-1">
                <p className="text-white text-lg mt-2">{currentSong.artist} .</p>
                <p className="text-white text-lg mt-2"> {currentSong.duration}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" p-5">
            <button
              onClick={handlePlayPause}
              className=" bg-green-500 flex items-center justify-center rounded-full h-14 w-14 opacity-100 transition-opacity hover:scale-105"
            >
              {currentSongId === currentSong._id && isPlaying ? (
                <IoMdPause className="text-black text-2xl" />
              ) : (
                <IoMdPlay className="text-black text-2xl" />
              )}
            </button>
            
          </div>
        </div>
      ) : (
        "Loading song..."
      )}
    </div>
  );
};

export default Clickedsong;
