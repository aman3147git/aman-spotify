import React from "react";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";

import { setSong,playPause } from "../redux/songSlice";

const Card = ({ song, onClick }) => {
    const dispatch=useDispatch();
    const {currentSongId,isPlaying } = useSelector((state) => state.song);
  
    const handlePlayPause = (e) => {
        e.stopPropagation(); 
        
        if (currentSongId === song._id) {
          
          dispatch(playPause());
        } else {
          
          dispatch(setSong({ song, songId: song._id }));
        }
      };

  return (
    <div
      onClick={() => onClick(song._id)}
      className="bg-[#1f1f1f] w-[150px] flex-shrink-0 rounded-lg overflow-hidden shadow-md hover:bg-[#333333] transition-colors relative group"
    >
      <img
        src={song.imageUrl}
        alt={song.artist}
        className="w-full h-40 object-cover"
      />

     
      <button
        type="button"
        onClick={handlePlayPause}
        className="absolute bottom-16 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
      >
        
        {currentSongId === song._id && isPlaying ? (
          <IoMdPause className="text-black text-2xl" />
        ) : (
          <IoMdPlay className="text-black text-2xl" />
        )}
      </button>

      <div className="p-1">
        <p className="text-white text-md font-semibold">{song.title}</p>
      </div>
      <div className="p-1">
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>
    </div>
  );
};

export default Card;