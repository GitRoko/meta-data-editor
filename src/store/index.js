import Vue from "vue";
import Vuex from "vuex";

import state from "./state.js";
import getters from "./getters.js";
import mutations from "./mutations";
import actions from "./actions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // namespaced: true,
  state,
  getters,
  mutations,
  actions,
  strict: false, //Не используйте строгий режим в production!!!!!!!!
});