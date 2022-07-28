<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title v-if="getCurrentFile !== null">{{
        getCurrentFile.fileName
      }}</v-toolbar-title>
      <v-toolbar-title v-if="getCurrentFile === null"
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

      <!-- <v-divider></v-divider> -->

      <v-list flat>
        <!-- <v-list-item-group color="primary">
          <v-list-item @click="createFile">
            <v-list-item-icon>
              <v-icon>mdi-file-plus-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>New file</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group> -->
        <!-- <v-divider></v-divider> -->

        <v-list-item @click="openDirectory">
          <v-list-item-icon>
            <v-icon>mdi-folder-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Open directory</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item @click="saveFile">
          <v-list-item-icon>
            <v-icon>mdi-file-code-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Save file</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-divider></v-divider>
        <!-- <v-list-item @click="deleteFile">
          <v-list-item-icon>
            <v-icon>mdi-file-remove-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Delete file</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-divider></v-divider>
      </v-list>

      <v-list nav dense>
        <v-list-item-group 
        v-model="selectedFiles" 
        color="primary"
        v-if="files.length > 0"
        >
          <v-list-item
            v-for="(file, i) in files"
            :key="i"
            @click="setCurrentFile(file.fileName)"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="file.fileName.split('.')[0]"
              ></v-list-item-title>
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

    <v-main class="grey lighten-5">
      <ContentData v-if="selectedFiles !== null" :title="getTitle" />
    </v-main>
  </v-app>
</template>

<script>
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
    selectedFiles: null, //fileList selected
    files: [],
  }),

  computed: {
    ...mapGetters([
      "getFiles",
      "getCurrentFile",
      "getTitle",
    ]),
  },

  watch: {
    getFiles: {
      handler: function (newVal) {
        this.files = newVal;
      },
      deep: true,
    },
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

    ...mapActions(["openDirectory", "saveFile", "deleteFile", "createFile", "setCurrentFile"]),
  },
};
</script>

<style scoped>
.v-toolbar__title {
  text-transform: uppercase;
  font-weight: bold;
}
</style>
