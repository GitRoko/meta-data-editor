<template>
  <v-select
    :value="selectValue"
    @input="changeSelectValue"
    :items="items"
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
    jsonType: String,
    fieldName: String,
  },
  data() {
    return {
      items: [],
      selectValue: "",
      selectLabel: "",
    };
  },
  created() {
    this.items = this.getItems();
    this.selectValue = this.items.includes(this.incomingItemValue)
      ? this.incomingItemValue
      : '';

    this.selectLabel = this.selectName;
  },
  computed: {
    
    // items() {
    //   const currentfile = this.$store.getters.getCurrentFile.fileName.split('.')[0];
    //   const data = this.$store.getters.allFiles;
    //   const list = data.map(item => item.fileName.split('.')[0]);
    //   // console.log(list);

    //   return list.filter(item => item !== currentfile);
    // }
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
    getItems() {
      const currentfile = this.$store.getters.getCurrentFile.fileName.split('.')[0];
      const data = this.$store.getters.allFiles;
      const list = data.map(item => item.fileName.split('.')[0]);
      // console.log(list);

      return list.filter(item => item !== currentfile);
    }
  },
};
</script>

<style scoped>
/* .field_name__selectField {
  width: 250px;
} */
</style>
