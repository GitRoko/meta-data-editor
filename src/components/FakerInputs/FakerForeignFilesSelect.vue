<template>
  <v-select
    :value="selectValue"
    @input="changeSelectValue"
    :items="options"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import { typeRules } from "../features/rules";


export default {
  name: "FakerForeignFilesSelect",
  props: {
    incomingItemValue: String,
    selectName: String,
    rowId: String,
    options: Array
  },
  data() {
    return {
      // items: [],
      selectValue: "",
      selectLabel: "",
    };
  },
  created() {
    // this.items = 
    this.selectValue = this.options.includes(this.incomingItemValue)
      ? this.incomingItemValue
      : '';

    this.selectLabel = this.selectName;
  },
  computed: {
    // ...mapGetters(["getForeignData", "getCurrentFile"]),

    // items() {
    //   const foreignDatasetOptions = this.getForeignData.datasetOptions
    //     .filter(fileName => fileName !== this.getCurrentFile.fileName);

    //   return foreignDatasetOptions;
    // },
  },
  watch: {
    selectValue(newValue, oldValue) {
      this.changeSelectValue(newValue, oldValue);
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),

    changeSelectValue(newValue) {
      const data = this.getPreparedDataTable();
      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item.dataset = newValue;
        } else {
          if (item.faker) {
            changeValue(item.faker);
          }
          if (item.array) {
            changeValue(item.array);
          }
          if (item.object) {
            item.object.forEach((item) => {
              changeValue(item);
            });
          }
        }
      }

      const newData = data.map((item) => {
        changeValue(item);

        return item;
      });

      this.updatePreparedDataTable(newData);
    },
  },
};
</script>

<style scoped>
/* .field_name__selectField {
  width: 250px;
} */
</style>
