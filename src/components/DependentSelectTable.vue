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
import { typeRules } from "../features/rules";


export default {
  name: "DependentSelectTable",
  props: {
    incomingItems: Array,
    incomingItemValue: String,
    selectName: String,
    field: String,
    fieldTitle: String,
    rowId: String,
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
    jsonType() {
      const table = this.$store.state.currentFileData.preparedDataTable;
      if (table) {
        return table.find(item => item.rowId === this.rowId).json_type;
        //  return table[this.rowId].json_type;
      }
      return '';
    },
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

      const newData = data.map((item) => {

        if (item.field_name === this.field) {
            item[this.fieldTitle] = newValue;
        }

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
}
</style>
