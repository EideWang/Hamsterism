import "@babel/polyfill";
import "mutationobserver-shim";
import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
//使用bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//清除browser預設css
// import "./assets/css/reset.css";

//highlight test
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; //样式文件

//base components
import LoadingSpinner from "./components/ui/LoadingSpinner.vue";
import BaseButton from "./components/ui/BaseButton.vue";

// import BaseCard from "./components/ui/BaseCard.vue";
const BaseCard = defineAsyncComponent(() => import("./components/ui/BaseCard.vue"));
const BaseDialog = defineAsyncComponent(() => import("./components/ui/BaseDialog.vue"));

const app = createApp(App);
// .use(Highlight)
app.component("loading-spinner", LoadingSpinner);
app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-dialog", BaseDialog);

app.directive("highlight", function(el) {
  let blocks = el.querySelectorAll("pre.ql-syntax");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});

app
  .use(store)
  .use(router)
  .mount("#app");
