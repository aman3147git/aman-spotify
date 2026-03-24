import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";

import { setSong,playPause } from "../redux/songSlice";


const Clickedalbum = () => {
  
  const [album,setAlbum]=useState(null);
  const { id } = useParams();
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch=useDispatch();
    const {currentSongId,isPlaying } = useSelector((state) => state.song);
  
    const handlePlayPause = (song) => {
        
        
        if (currentSongId === song._id) {
          
          dispatch(playPause());
        } else {
          
          dispatch(setSong({ song,songId:song._id }));
        }
      };
  


  
  
  useEffect(() => {
    fetchalbumDetails();
  }, [id]);
  
  const fetchalbumDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/api/album/${id}`);
      setAlbum(data);
    } catch (err) {
      setError("Error fetching song details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="">
      {album ? (
        <div className="flex flex-col">
          <div className="min-h-0 bg-gradient-to-r from-blue-900 to-slate-300 px-4 pb-8 pt-8 sm:min-h-[220px] sm:px-6 sm:pb-12 sm:pt-12">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
              <div className="shrink-0">
                <img
                  src={album.imageUrl}
                  alt={album.artist}
                  className="h-36 w-36 rounded-lg object-cover shadow-lg hover:scale-105 sm:h-[170px] sm:w-[170px]"
                />
              </div>
              <div className="min-w-0 flex-1 sm:mt-10">
                <h1 className="break-words text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  {album.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p className="text-base text-white sm:text-lg">{album.artist}</p>
                <span className="hidden text-white sm:inline">·</span>
                <p className="text-base text-white/90 sm:text-lg">{album.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-bl from-white to-gray-600 p-4 sm:p-5">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">Songs</h2>
            {album.songs && album.songs.length > 0 ? (
              <div className="scroll-thin-brown -mx-4 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[480px] text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {album.songs.map((song, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-500 ${
                        index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
                      }`}
                    >
                      <td className="py-2 px-4">
                        <button
                                onClick={()=>handlePlayPause(song)}
                                className=""
                              >
                                
                                {currentSongId === song._id && isPlaying ? (
                                  <IoMdPause className="text-black text-2xl" />
                                ) : (
                                  <IoMdPlay className="text-black text-2xl" />
                                )}
                              </button>
                      </td>
                      <td className="py-2 px-4 flex gap-1"><img className="h-10 w-10 rounded-lg" src={song.imageUrl} alt="" />{song.title}</td>
                      <td className="py-2 px-4">{song.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p className="text-black">No songs available in this album.</p>
            )}
          </div>
        </div>
      ) : (
        "Loading album..."
      )}
    </div>
  );
};

export default Clickedalbum;
