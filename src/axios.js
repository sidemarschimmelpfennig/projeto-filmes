import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTYzZWMwMjIwNGQ1NzQ1Yjk4ODllNmIyMWVhYmQyZCIsIm5iZiI6MTczOTc1NDIxMy45MSwic3ViIjoiNjdiMjhhZTViZTExMzVjMWQ4NmRkNThkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mLR-HnFa-b9GqC92tO1ijdihA5WJZVfCpuYMJV-gewY";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    Authorization: `Bearer ${token}`,
    api_key: "ce63ec02204d5745b9889e6b21eabd2d",
    // language: "pt-BR",
  },
});
