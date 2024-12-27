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
          <div className="flex h-[220px] bg-gradient-to-r from-blue-900 to-slate-300">
            <div className="pl-5 pt-12 flex gap-3">
              <div className="">
                <img
                  src={album.imageUrl}
                  alt={album.artist}
                  className="w-[170px] h-[170px] object-cover rounded-lg hover:scale-105"
                />
              </div>
              <div className="">
                <h1 className="text-white text-6xl font-bold mt-14">
                  {album.title}
                </h1>
                <div className="flex gap-1">
                <p className="text-white text-lg mt-2">{album.artist} .</p>
                <p className="text-white text-lg mt-2">{album.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-bl from-white to-gray-600 p-5">
            <h2 className="text-2xl font-bold mb-4">Songs</h2>
            {album.songs && album.songs.length > 0 ? (
              <table className="w-full text-left">
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
