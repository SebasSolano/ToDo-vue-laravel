import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "./firebase";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";

const app = createApp(App);

app.use(router).use(Antd).mount("#app");
