import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './player-slice';
import playlistReducer from './playlist-slice';
import userReducer from './user-slice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist: playlistReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;