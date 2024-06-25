import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPlaylist } from "../../../types";
import api from "../../../utils/api";

export const fetchplaylist = createAsyncThunk("playlist/fetchAll", async () => {
  const response = await api.get("/playlists");
  return response.data;
});

export const updatePlaylist = createAsyncThunk(
  "playlist/update",
  async (cinema: IPlaylist) => {
    const response = await api.put(`${"/playlists"}/${cinema._id}`, cinema);
    return response.data;
  }
);

export const deletePlaylist = createAsyncThunk(
  "playlist/delete",
  async (id: string) => {
    await api.delete(`${"/playlists"}/${id}`);
    return id;
  }
);
