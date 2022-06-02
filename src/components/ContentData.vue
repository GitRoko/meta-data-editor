<template>
  <v-container>
    <v-row>
      <v-sheet color="white" elevation="0" height="100%" width="100%">
        <v-col cols="12">
          <h2 v-if="title">{{ title.split(" ").filter(item => item !== "#" && item !== "description").join(" ") }}</h2>
          <DataTable :incomingDataTable="dataTable" />
        </v-col>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import YAML from "yaml";
import DataTable from "../components/DataTable.vue"
export default {
  name: "ContentData",
  components: {
    DataTable,
  },
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
    title() {
      // get title
      return this.incomingData.find((item) => item.startsWith("#"));
    },
    parsedIncomingDataToJSON() {
      const preparedData = this.incomingData;
      const filteredData = preparedData
        .filter((item) => !item.startsWith("#"))
        .join("\r\n");

      return YAML.parse(filteredData); // parsedIncomingDataToJSON: Object
      // return JSON.stringify(YAML.parse(filteredData), null, 2); // parsedIncomingDataToJSON: String
    },
    dataTable() {
      const innerData = this.parsedIncomingDataToJSON;
      const newData = [];
      // console.log(innerData);
      // console.log(Object.keys(innerData));

      Object.keys(innerData).forEach((item) => {
        newData.push({
            field_name: item,
            json_type: innerData[item].json_type,
            mandatory: innerData[item].mandatory,
            td_type: innerData[item].td_type,
            pydantic_type: innerData[item].pydantic_type,
            example: innerData[item].example,
            faker: innerData[item].faker,
        });
      });
      console.log(newData);

      return newData;
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


<style scoped>
h2 {
  text-align: center;
}
</style>
