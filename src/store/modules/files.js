import { readDirectory } from "@/features/useFileSistemAPI";

export default {
  actions: {
    // перенести в компонент
    async openDirectory(context) {
      const response = await readDirectory();

      context.commit("updateFiles", response);
    },
  },
  mutations: {
    updateFiles(state, files) {
      state.files = files;
    },
  },
  state: {
    files: null,
  },
  getters: {
    allFiles(state) {
      return state.files;
    },
  },
};

