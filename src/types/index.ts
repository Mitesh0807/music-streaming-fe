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
