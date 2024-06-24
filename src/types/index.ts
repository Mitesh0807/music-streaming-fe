import { SignupSchema } from "@/schema/SingupSchema";
import { z } from "zod";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthState = {
  user: IUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type IUser = {
  userName: string;
  email: string;
};

export type SignupPayload = z.infer<typeof SignupSchema>;

export type IPlaylist = {
  _id: string;
  name: string;
  user: string;
  songs: ISong[];
  isPublic: boolean;
  image: string;
};

export type ISong = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  url: string;
  image: string;
  __v: number;
};
