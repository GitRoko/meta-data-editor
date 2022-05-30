<template>
  <v-container>
    <v-row>
      <v-sheet color="white" elevation="0" height="100%" width="100%">
        <v-col cols="12">
          <p>{{ title }}</p>
          <v-textarea
            v-model="textArea"
            auto-grow
            solo
            name="text"
            label="Solo textarea"
          ></v-textarea>
          <p>{{ parsedIncomingDataToJSON }}</p>
        </v-col>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import YAML from 'yaml';
export default {
  name: "ContentData",
  props: {
    init_data: String,
  },
  watch: {
    textArea() {
      this.textArea = this.parsedIncomingDataToJSON;
  //     this.title = this.data.find((item) => item.startsWith("#"));
  //     this.parsedData = this.data
  //       .filter((item) => !item.startsWith("#"))
  //       .join("\n");
    },
  },
  computed: {
    incomingData() {
      return this.init_data.split("\r\n");
    },
    title() { // get title
      return this.incomingData.find((item) => item.startsWith("#"));
    },
    parsedIncomingDataToJSON() {
      const preparedData = this.incomingData;
      const filteredData = preparedData.filter((item) => !item.startsWith("#"))
        .join("\r\n");

      return JSON.stringify(YAML.parse(filteredData), null, 2);
    },
  },
  data() {
    return {
      textArea: "",
      // data: "",
      // title: "",
      // parsedData: "",
    };
  },
};
</script>
