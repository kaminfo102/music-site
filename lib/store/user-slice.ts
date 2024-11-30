import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  volume: number;
  favoriteGenres: string[];
}

interface UserState {
  preferences: UserPreferences;
  likedSongs: string[];
}

const initialState: UserState = {
  preferences: {
    theme: 'system',
    volume: 1,
    favoriteGenres: [],
  },
  likedSongs: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<'light' | 'dark' | 'system'>
    ) => {
      state.preferences.theme = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.preferences.volume = action.payload;
    },
    addFavoriteGenre: (state, action: PayloadAction<string>) => {
      if (!state.preferences.favoriteGenres.includes(action.payload)) {
        state.preferences.favoriteGenres.push(action.payload);
      }
    },
    removeFavoriteGenre: (state, action: PayloadAction<string>) => {
      state.preferences.favoriteGenres = state.preferences.favoriteGenres.filter(
        (genre) => genre !== action.payload
      );
    },
    toggleLikedSong: (state, action: PayloadAction<string>) => {
      const index = state.likedSongs.indexOf(action.payload);
      if (index === -1) {
        state.likedSongs.push(action.payload);
      } else {
        state.likedSongs.splice(index, 1);
      }
    },
  },
});

export const {
  setTheme,
  setVolume,
  addFavoriteGenre,
  removeFavoriteGenre,
  toggleLikedSong,
} = userSlice.actions;

export default userSlice.reducer;