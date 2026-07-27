import axios from "axios";

const token = process.env.VUE_APP_AXIOS_TOKEN;

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    Authorization: `Bearer ${token}`,
    api_key: process.env.VUE_APP_AXIOS_API_KEY,
    // language: "pt-BR",
  },
});
