<template>
  <v-app id="inspire">

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title v-if="this.activeFile !== null">{{
        this.activeFile.fileName
      }}</v-toolbar-title>
      <v-toolbar-title v-if="this.activeFile === null"
        >MetaData editor</v-toolbar-title
      >
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" height="100%" hide-overlay>
      <v-sheet color="primary" elevation="3" dark>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6"> Menu </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>

      <v-divider></v-divider>

      <v-list flat>
        <v-list-item-group color="primary">

          <v-list-item @click="openDirectory">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Open Directory</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="saveFile">
            <v-list-item-icon>
              <v-icon>mdi-folder-file</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Save File</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in allFiles"
            :key="i"
            @click="getActiveFile(item.fileName)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.fileName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-apple-keyboard-control</v-icon>
    </v-btn>

    <v-main>
      <ContentData v-if="activeFileData" v-bind:init_data="activeFileData" />
    </v-main>
  </v-app>
</template>

<script>
import {
  openFile,
  writeFile,
  // readDirectory,
} from "./features/useFileSistemAPI";
import ContentData from "./components/ContentData.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    ContentData,
  },

  data: () => ({
    drawer: null,
    fab: false, //scrollTop
    textAreaValue: "",
    // dataDirectory: [],
    activeFileData: null,
    activeFile: null,
    selectedItem: 0, //fileList selected
    // itemsFiles: [], // fileList items
  }),
  computed: {
    ...mapGetters(["allFiles"]),
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },

    saveFile() {
      if (this.activeFileData !== "") {
        writeFile(this.activeFile.fileHandle, this.textAreaValue);
      }
    },
    ...mapActions(["openDirectory"]),

    getActiveFile(fileName) {
      this.activeFile = this.allFiles.find(
        (item) => item.fileName === fileName
      );
      openFile(this.activeFile.fileHandle)
        .then((response) => (this.activeFileData = response))
        .then((data) => (this.textAreaValue = data));
    },
  },
};
</script>

<style scoped>
.v-toolbar__title {
  text-transform: uppercase;
  font-weight: bold;
}
</style>
