import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

interface PlaylistState {
  playlists: Playlist[];
}

const initialState: PlaylistState = {
  playlists: [],
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, action: PayloadAction<{ name: string }>) => {
      state.playlists.push({
        id: Date.now().toString(),
        name: action.payload.name,
        songs: [],
      });
    },
    addSongToPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; song: Song }>
    ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (playlist) {
        playlist.songs.push(action.payload.song);
      }
    },
    removeSongFromPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; songId: string }>
    ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (playlist) {
        playlist.songs = playlist.songs.filter(
          (song) => song.id !== action.payload.songId
        );
      }
    },
  },
});

export const { createPlaylist, addSongToPlaylist, removeSongFromPlaylist } =
  playlistSlice.actions;

export default playlistSlice.reducer;