<template>
  <v-container>
    <v-row>
      <v-sheet color="white" elevation="0" height="100%" width="100%">
        <v-col cols="12">
          <!-- <v-textarea
            v-model="dat"
            auto-grow
            solo
            name="text"
            label="Solo textarea"
          ></v-textarea> -->
          <p>{{ title }}</p>
          <p>{{ parsedData }}</p>
        </v-col>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContentData",
  props: {
    init_data: String,
  },
  // watch: {
  //   init_data() {
  //     this.data = this.init_data.split("\r\n");
  //     this.title = this.data.find((item) => item.startsWith("#"));
  //     this.parsedData = this.data
  //       .filter((item) => !item.startsWith("#"))
  //       .join("\n");
  //   },
  // },
  computed: {
    data() {
      return this.init_data.split("\r\n");
    },
    title() {
      return this.data.find((item) => item.startsWith("#"));
    },
    parsedData() {
      return this.data
        .filter((item) => !item.startsWith("#"))
        .join("\r\n");
    },
  },
  data() {
    return {
      // data: "",
      // title: "",
      // parsedData: "",
    };
  },
};
</script>
