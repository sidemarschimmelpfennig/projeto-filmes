import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const token = config.public.tmdbToken;
  const apiKey = config.public.tmdbApiKey;
  const baseURL = config.public.apiBaseUrl || "https://api.themoviedb.org/3";

  const axiosInstance = axios.create({
    baseURL,
    params: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(apiKey ? { api_key: apiKey } : {}),
    },
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
