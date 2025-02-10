import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import VueAxios from "vue-axios";

// Create a Vue application instance
createApp(App).use(store).use(router).use(VueAxios).mount("#app");
