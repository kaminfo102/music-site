import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  queue: Song[];
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  duration: 0,
  queue: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    addToQueue: (state, action: PayloadAction<Song>) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((song) => song.id !== action.payload);
    },
  },
});

export const {
  setCurrentSong,
  setIsPlaying,
  setVolume,
  setProgress,
  setDuration,
  addToQueue,
  removeFromQueue,
} = playerSlice.actions;

export default playerSlice.reducer;