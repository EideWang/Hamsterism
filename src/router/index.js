import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import About from "../views/about/About.vue";
// import Notes from "../views/notes/Notes.vue";
// import TheNote from "../views/notes/TheNote.vue";
// import CreateNote from "../views/notes/CreateNote.vue";
// import EditNote from "../views/notes/EditNote.vue";
// import Works from "../views/works/Works.vue";
// import NotFound from "../views/NotFound.vue";
// import TestPage from "../views/TestPage.vue";
// import Login from "../views/auth/Login.vue";

//非同步載入component
const About = defineAsyncComponent(() => import("../views/about/About.vue"));
const Notes = defineAsyncComponent(() => import("../views/notes/Notes.vue"));
const TheNote = defineAsyncComponent(() => import("../views/notes/TheNote.vue"));
const CreateNote = defineAsyncComponent(() => import("../views/notes/CreateNote.vue"));
const EditNote = defineAsyncComponent(() => import("../views/notes/EditNote.vue"));
const Works = defineAsyncComponent(() => import("../views/works/Works.vue"));
const NotFound = defineAsyncComponent(() => import("../views/NotFound.vue"));
const TestPage = defineAsyncComponent(() => import("../views/TestPage.vue"));
const Login = defineAsyncComponent(() => import("../views/auth/Login.vue"));

//要使用store內的變數，需要import
import store from "../store/index.js";
//in App.vue，<router-view>只能顯示root route，children route需在其parent component內加入<router-view>
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/about", name: "About", component: About },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
  },
  {
    path: "/notes/create",
    name: "CreateNote",
    component: CreateNote,
    meta: { requiresAdmin: true },
  },
  {
    path: "/notes/:noteId",
    name: "Note",
    component: TheNote,
    props: true,
  },
  {
    path: "/notes/:noteId/edit",
    component: EditNote,
    props: true,
    meta: { requiresAdmin: true },
  },
  { path: "/works", name: "Works", component: Works },
  { path: "/test", component: TestPage, meta: { requiresAdmin: true } },
  { path: "/login", name: "Login", component: Login, meta: { requiresUnauth: true } },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//navigation guard setting
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin && !store.state.auth.isAdmin) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters["auth/isAuthenticated"]) {
    //避免已登入的再跑進登入頁面
    next("/");
  } else {
    next();
  }
});

export default router;
