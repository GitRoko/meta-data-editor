<template>
  <v-select
    :value="selectValue"
    @input="changeSelectValue"
    :items="items"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7 justify-center"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { typeRules } from "../features/rules";


export default {
  name: "DependentSelectTable",
  props: {
    incomingItemValue: String,
    selectName: String,
    fieldTitle: String,
    rowId: String,
    jsonType: String,
  },
  data() {
    return {
      // items: [],
      selectValue: "",
      selectLabel: "",
    };
  },
  created() {
    this.selectValue = this.items.includes(this.incomingItemValue)
      ? this.incomingItemValue
      : this.items[0];

    this.selectLabel = this.selectName;
  },
  computed: {
    // jsonType() {
    //   const table = this.$store.state.currentFileData.preparedDataTable;
    //   if (table) {
    //     return table.find(item => item.rowId === this.rowId).json_type;
    //     //  return table[this.rowId].json_type;
    //   }
    //   return '';
    // },
    items() {
      return typeRules[this.fieldTitle][this.jsonType];
    }
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
          item[this.fieldTitle] = newValue;
        } else {
          if (item.array) {
            changeValue(item.array);
          }
          if (item.faker) {
            changeValue(item.faker);
          }
          if (item.object) {
            item.object.forEach(item => {
              changeValue(item);
            })
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
.field_name__selectField {
  width: 150px;
  margin: auto;
}
</style>
