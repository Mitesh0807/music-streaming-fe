import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchplaylist,
  updatePlaylist,
  deletePlaylist,
} from "./playlist.actions";
import { IPlaylist, ISong } from "../../../types";

interface playlistState {
  playlist: IPlaylist[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  setCurrentPlayingSong: ISong | null;
  plyingSong: ISong | null;
}

const initialState: playlistState = {
  playlist: [],
  status: "idle",
  error: null,
  setCurrentPlayingSong: null,
  plyingSong: null,
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
        (state, action: PayloadAction<IPlaylist[]>) => {
          state.status = "succeeded";
          state.playlist = action.payload;
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
      );
  },
});

export const { updatePlaylistOrder, setCurrentPlayingSong } =
  playlistSlice.actions;

export default playlistSlice.reducer;
