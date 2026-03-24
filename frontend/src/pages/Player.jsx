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
      <div className="flex items-center justify-center bg-black px-4 py-6 text-sm text-white sm:text-base">
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
    <div className="flex flex-col gap-3 border-t border-white/10 bg-black px-3 py-3 text-white sm:px-4 md:flex-row md:items-center md:justify-between md:gap-4 md:py-2 lg:px-6">
      <div className="order-2 min-w-0 md:order-1 md:w-[28%] lg:w-1/4">
        <div className="flex items-center gap-3">
          <img
            src={currentSong.imageUrl}
            alt={currentSong.title}
            className="h-12 w-12 shrink-0 rounded-md object-cover sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium sm:text-base">{currentSong.title}</h3>
            <p className="truncate text-xs text-gray-400 sm:text-sm">{currentSong.artist}</p>
          </div>
        </div>
      </div>

      <div className="order-1 w-full md:order-2 md:w-[44%] lg:w-5/12">
        <div className="mb-2 flex items-center justify-center gap-4 sm:gap-6">
          <CiShuffle className={`shrink-0 cursor-pointer text-xl sm:text-2xl ${isShuffle ? 'text-red-500' : 'text-white'}`} onClick={handleShuffleToggle} />
          <FaBackwardStep className="shrink-0 cursor-pointer text-lg sm:text-xl" onClick={handleBackward}/>
          <button type="button" onClick={togglePlayPause} className="flex shrink-0 items-center justify-center rounded-full bg-white p-2 hover:opacity-90">
            {isPlaying ? (
              <IoMdPause className="text-lg text-black sm:text-xl" />
            ) : (
              <IoMdPlay className="text-lg text-black sm:text-xl" />
            )}
          </button>
          <FaForwardStep className="shrink-0 cursor-pointer text-lg sm:text-xl" onClick={handleForward}/>

          <CiRepeat className={`shrink-0 cursor-pointer text-xl sm:text-2xl ${isRepeat ? 'text-red-500' : 'text-white'}`} onClick={handleRepeatToggle} />
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="w-10 shrink-0 tabular-nums text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={100}
            className="h-1 w-full min-w-0 cursor-pointer accent-green-500"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            aria-label="Seek"
          />
          <span className="w-10 shrink-0 text-right tabular-nums text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="order-3 hidden w-full items-center justify-end gap-2 md:flex md:w-[28%] lg:w-1/4">
        <div className="hidden items-center gap-2 lg:flex">
          <MdOutlineSmartDisplay className="text-2xl text-gray-300" />
          <TbMicrophone2 className="text-2xl text-gray-300" />
          <HiOutlineQueueList className="text-2xl text-gray-300" />
          <TbDevices2 className="text-2xl text-gray-300" />
          <RxSpeakerQuiet className="text-2xl text-gray-300" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="h-1 w-24 max-w-full shrink-0 cursor-pointer accent-white sm:w-32"
          aria-label="Volume"
        />
        <PiSpeakerSimpleX className="hidden text-2xl text-gray-300 xl:block" />
      </div>

      <div className="order-3 flex items-center justify-center gap-3 md:hidden">
        <RxSpeakerQuiet className="text-xl text-gray-400" />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="h-1 w-full max-w-[200px] cursor-pointer accent-white"
          aria-label="Volume"
        />
      </div>
      <audio ref={audioRef} src={currentSong.audioUrl} onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate} onEnded={handleSongEnd}/>
    </div>
  );
};

export default Player;







