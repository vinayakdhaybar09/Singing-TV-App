import {createSlice} from '@reduxjs/toolkit';
import { discoverMusic } from '../../utils/musicData';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
  searchData: [],
  activeTab:''
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
    },
    // setActiveSong: (state, action) => {
    //   state.activeSong = action.payload.song;

    //   if (action.payload?.data?.tracks?.hits) {
    //     state.currentSongs = action.payload.data.tracks.hits;
    //   } else if (action.payload?.data?.properties) {
    //     state.currentSongs = action.payload?.data?.tracks;
    //   } else {
    //     state.currentSongs = action.payload.data;
    //   }
    //   state.currentIndex = action.payload.i;
    //   state.isActive = true;
    // },

    // nextSong: (state, action) => {
    //   if (state.currentSongs[action.payload]?.track) {
    //     state.activeSong = state.currentSongs[action.payload]?.track;
    //   } else {
    //     state.activeSong = state.currentSongs[action.payload];
    //   }

    //   state.currentIndex = action.payload;
    //   state.isActive = true;
    // },

    // prevSong: (state, action) => {
    //   if (state.currentSongs[action.payload]?.track) {
    //     state.activeSong = state.currentSongs[action.payload]?.track;
    //   } else {
    //     state.activeSong = state.currentSongs[action.payload];
    //   }

    //   state.currentIndex = action.payload;
    //   state.isActive = true;
    // },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    serchInput: (state, action) => {
      state.searchData = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    // selectGenreListId: (state, action) => {
    //   state.genreListId = action.payload;
    // },
  },
});

export const {setActiveSong, playPause, nextSong, prevSong, selectGenreListId, serchInput, setActiveTab} =
  playerSlice.actions;

export default playerSlice.reducer;
