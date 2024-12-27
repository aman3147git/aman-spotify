import { createSlice } from "@reduxjs/toolkit";
const songSlice=createSlice({
    name:"song",
    initialState:{
        songs: [],
        currentSong: null,
        currentSongId: null,
        isPlaying: false,
        isShuffle: false,
        isRepeat: false,
    },
    reducers:{
        setSongs: (state, action) => {
            state.songs = action.payload; // Set the list of songs from the API
        },
        setSong:(state,action)=>{
            state.currentSong=action.payload.song;   //when new song comes
            state.currentSongId=action.payload.songId;
            state.isPlaying=true;     //Automatically play when a new song is set
        },
        
        playPause: (state) => {
            state.isPlaying = !state.isPlaying;
        },

        nextSong: (state) => {
            if (!state.songs || state.songs.length === 0) {
              console.error("Songs list is empty or undefined.");
              return;
            }
      
            let nextIndex;
      
            if (state.isShuffle) {
              // Get a random song index for shuffle
              nextIndex = Math.floor(Math.random() * state.songs.length);
            } else {
              const currentIndex = state.songs.findIndex(
                (song) => song._id === state.currentSongId
              );
              nextIndex = currentIndex < state.songs.length - 1 ? currentIndex + 1 : 0;
            }
      
            const nextSong = state.songs[nextIndex];
            state.currentSong = nextSong;
            state.currentSongId = nextSong._id;
            state.isPlaying = true;
          },
      
          previousSong: (state) => {
            if (!state.songs || state.songs.length === 0) {
              console.error("Songs list is empty or undefined.");
              return;
            }
      
            const currentIndex = state.songs.findIndex(
              (song) => song._id === state.currentSongId
            );
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : state.songs.length - 1;
      
            const previousSong = state.songs[prevIndex];
            state.currentSong = previousSong;
            state.currentSongId = previousSong._id;
            state.isPlaying = true;
          },
      
          toggleShuffle: (state) => {
            state.isShuffle = !state.isShuffle;
          },
      
          toggleRepeat: (state) => {
            state.isRepeat = !state.isRepeat;
          },
    }
})
export const {setSongs, setSong, playPause, nextSong, previousSong ,toggleShuffle,
    toggleRepeat,}=songSlice.actions;
export default songSlice.reducer;