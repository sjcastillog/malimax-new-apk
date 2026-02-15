import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import axios from "axios";
import { Platform } from "react-native";

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const API_URL =
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_API_URL_IOS
      : process.env.EXPO_PUBLIC_API_URL_ANDROID;

export const puceApi = axios.create({
  baseURL: API_URL,
});

puceApi.interceptors.request.use(async (config) => {
  const token = await SecureStorageAdapter.getItem("token");

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});
