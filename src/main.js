import { createApp } from "vue"; // Alterado para importar createApp
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import axios from "./axios";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(store); // Em Vue 3, o store é integrado assim
app.use(router); // Mesmo para o router
// E o VueAxios também

app.mount("#app"); // Finalmente, monta o app
