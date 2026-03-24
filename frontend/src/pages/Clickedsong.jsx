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
          <div className="min-h-0 bg-gradient-to-r from-green-900 to-slate-300 px-4 pb-8 pt-8 sm:min-h-[220px] sm:px-6 sm:pb-12 sm:pt-12">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
              <div className="shrink-0">
                <img
                  src={currentSong.imageUrl}
                  alt={currentSong.artist}
                  className="h-36 w-36 rounded-lg object-cover shadow-lg hover:scale-105 sm:h-[170px] sm:w-[170px]"
                />
              </div>
              <div className="min-w-0 flex-1 sm:mt-10">
                <h1 className="break-words text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  {currentSong.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p className="text-base text-white sm:text-lg">{currentSong.artist}</p>
                <span className="hidden text-white sm:inline">·</span>
                <p className="text-base text-white/90 sm:text-lg">{currentSong.duration}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-5">
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
