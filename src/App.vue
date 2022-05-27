<template>
  <v-app id="inspire">

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-if="drawer === false" @click="drawer = !drawer"></v-app-bar-nav-icon>
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
      <!--  -->
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
          <!-- <v-list-item @click="readFile">
            <v-list-item-icon>
              <v-icon>mdi-folder-file</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Open File</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-item @click="openDirectory">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <!-- <v-btn @click="readFile" text>
                {{ item.text }}
              </v-btn> -->
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
            v-for="(item, i) in itemsFiles"
            :key="i"
            @click="getActiveFile(item.fileName)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

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
      <!-- <v-main class="grey lighten-2"> -->
      <v-container>
        <v-row>
          <v-sheet color="white" elevation="0" height="100%" width="100%">
            <v-col cols="12">
              <v-textarea
                v-model="textAreaValue"
                auto-grow
                solo
                name="text"
                label="Solo textarea"
              ></v-textarea>
            </v-col>
          </v-sheet>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {
  openFile,
  writeFile,
  readDirectory,
} from "./features/useFileSistemAPI";

export default {
  data: () => ({
    drawer: null,
    fab: false, //scrollTop
    // fileData: null,
    textAreaValue: "",
    dataDirectory: [],
    activeFileData: null,
    activeFile: null,
    selectedItem: 0, //fileList selected
    itemsFiles: [], // fileList items
  }),

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    // readFile() {
    //   openFile()
    //     .then((response) => (this.fileData = response))
    //     .then((data) => (this.textAreaValue = data));
    // },
    saveFile() {
      if (this.activeFileData !== "") {
        writeFile(this.activeFile.fileHandle, this.textAreaValue);
      }
    },
    openDirectory() {
      readDirectory()
        .then((data) => (this.dataDirectory = data))
        .then((data) => {
          const item = data.map((item) => {
            return { fileName: item.fileName, icon: "mdi-file" };
          });

          this.itemsFiles = item;
        });
    },
    getFileData() {},
    getActiveFile(fileName) {
      this.activeFile = this.dataDirectory.find(
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
