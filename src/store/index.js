import { createStore } from "vuex";
import notesModule from "./modules/notes/index.js";
import authModule from "./modules/auth/index.js";
import worksModule from "./modules/works/index.js";
const store = createStore({
  modules: {
    notes: notesModule,
    auth: authModule,
    works: worksModule,
  },
});
export default store;
