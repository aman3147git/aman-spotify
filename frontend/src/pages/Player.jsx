import React, { useEffect, useRef, useState } from "react";
import { CiShuffle, CiRepeat } from "react-icons/ci";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { TbMicrophone2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { TbDevices2 } from "react-icons/tb";
import { RxSpeakerQuiet } from "react-icons/rx";
import { PiSpeakerSimpleX } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { nextSong, playPause, previousSong, setSong, setSongs, toggleRepeat, toggleShuffle } from "../redux/songSlice"; 
import axiosInstance from "../axios";

const Player = () => {
  const {songs, currentSong, isPlaying,isRepeat,isShuffle } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  

  useEffect(() => {
    // Ensures the audio is playing when a new song is selected
    if (currentSong && audioRef.current) {
      audioRef.current.play()
        .then(() => {
          console.log("Playing the new song");
        })
        .catch((error) => {
          console.error("Error playing the song:", error);
        });
    }
  }, [currentSong]);


  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axiosInstance.get("/api/song/get");
        
          dispatch(setSongs(response.data));
      
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [dispatch]);


  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Update current time as the song progresses
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Format time (seconds) to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Handle manual seek
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleSongEnd = () => {
    if (isRepeat) {
      // If repeat is on, restart the current song
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      // If shuffle is on, pick a random song
      if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        const nextSong = songs[randomIndex];
        dispatch(setSong({ song: nextSong, songId: nextSong._id }));
      } else {
        // If normal mode, go to the next song
        const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
        const nextSong = songs[currentIndex + 1] || songs[0];  // Loop to the first song if at the end
        dispatch(setSong({ song: nextSong, songId: nextSong._id }));
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);


  if (!currentSong) {
    return (
      <div className="flex items-center justify-center m-4 bg-black text-white">
        Select a song to play!
      </div>
    );
  }

  const togglePlayPause = () => {
    dispatch(playPause());
  };

  const handleBackward = () => {
    dispatch(previousSong());
  };

  const handleForward = () => {
    dispatch(nextSong());
  };
  
  const handleShuffleToggle = () => {
    dispatch(toggleShuffle());
  };

  const handleRepeatToggle = () => {
    dispatch(toggleRepeat());
  };


  return (
    <div className="flex items-center justify-between m-4 bg-black">
      <div className="w-2/12">
        <div className="flex items-center gap-2">
          <img
            src={currentSong.imageUrl}
            alt={currentSong.title}
            className="h-16 w-16 rounded-md"
          />
          <div className="">
            <h3 className="mb-1">{currentSong.title}</h3>
            <p className="text-sm text-gray-400">{currentSong.artist}</p>
          </div>
        </div>
      </div>

      <div className="w-5/12">
        <div className="flex justify-center items-center mb-2 gap-6">
          <CiShuffle className={`text-2xl ${isShuffle ? 'text-red-500' : 'text-white'}`} onClick={handleShuffleToggle} />
          <FaBackwardStep className="text-xl" onClick={handleBackward}/>
          <button onClick={togglePlayPause} className="flex items-center rounded-full justify-center bg-white p-2">
            {isPlaying ? (
              <IoMdPause className="text-black text-lg" />
            ) : (
              <IoMdPlay className="text-black text-lg" />
            )}
          </button>
          <FaForwardStep className="text-xl" onClick={handleForward}/>

          <CiRepeat className={`text-2xl ${isRepeat ? 'text-red-500' : 'text-white'}`} onClick={handleRepeatToggle} />
        </div>
        <div className="flex items-center text-sm gap-1">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={100}
            className="w-full block h-1"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-2/12 flex items-center gap-3">
        <MdOutlineSmartDisplay className="text-2xl" />
        <TbMicrophone2 className="text-2xl" />
        <HiOutlineQueueList className="text-2xl" />
        <TbDevices2 className="text-2xl" />
        <RxSpeakerQuiet className="text-2xl" />
        <input type="range" min={0} max={100} value={volume}
          onChange={(e)=>setVolume(e.target.value)} className="w-1/2 block h-1" />
        <PiSpeakerSimpleX className="text-2xl" />
      </div>
      <audio ref={audioRef} src={currentSong.audioUrl} onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate} onEnded={handleSongEnd}/>
    </div>
  );
};

export default Player;







