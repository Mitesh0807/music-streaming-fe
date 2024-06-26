import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchplaylist,
  updatePlaylist,
  deletePlaylist,
  searchPlaylists,
} from "./playlist.actions";
import { IPlaylist, ISong } from "../../../types";

interface playlistState {
  playlist: IPlaylist[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  setCurrentPlayingSong: ISong | null;
  plyingSong: ISong | null;
  searchResults: { _id: string; name: string }[];
}

const initialState: playlistState = {
  playlist: [],
  status: "idle",
  error: null,
  setCurrentPlayingSong: null,
  plyingSong: null,
  searchResults: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    updatePlaylistOrder: (state, action: PayloadAction<ISong[]>) => {
      state.playlist[0].songs = action.payload;
    },
    setCurrentPlayingSong: (state, action: PayloadAction<ISong | null>) => {
      state.setCurrentPlayingSong = action.payload;
      state.plyingSong = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchplaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchplaylist.fulfilled,
        (state, action: PayloadAction<IPlaylist | IPlaylist[]>) => {
          state.status = "succeeded";
          if (Array.isArray(action.payload)) {
            state.playlist = action.payload;
            state.setCurrentPlayingSong = action.payload[0].songs[0];
            state.plyingSong = action.payload[0].songs[0];
          } else {
            state.playlist = [action.payload];
            state.setCurrentPlayingSong = action.payload.songs[0];
            state.plyingSong = action.payload.songs[0];
          }
        }
      )
      .addCase(fetchplaylist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch playlist";
      })
      .addCase(
        updatePlaylist.fulfilled,
        (state, action: PayloadAction<IPlaylist>) => {
          const index = state.playlist.findIndex(
            (cinema) => cinema._id === action.payload._id
          );
          if (index !== -1) {
            state.playlist[index] = action.payload;
          }
        }
      )
      .addCase(
        deletePlaylist.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.playlist = state.playlist.filter(
            (cinema) => cinema._id !== action.payload
          );
        }
      )
      .addCase(searchPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        searchPlaylists.fulfilled,
        (state, action: PayloadAction<{ _id: string; name: string }[]>) => {
          state.status = "succeeded";
          state.searchResults = action.payload;
        }
      )
      .addCase(searchPlaylists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to search playlists";
      });
  },
});

export const { updatePlaylistOrder, setCurrentPlayingSong } =
  playlistSlice.actions;

export default playlistSlice.reducer;
