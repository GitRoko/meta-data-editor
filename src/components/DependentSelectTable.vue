<template>
  <v-select
    v-model="selectValue"
    :items="incomingItems"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "DependentSelectTable",
  props: {
    incomingItems: Array,
    incomingItemValue: String,
    selectName: String,
    field: String,
    fieldTitle: String,
  },
  data() {
    return {
      // items: [],
      // selectValue: "",
      selectLabel: "",
    };
  },
  created() {
    this.items = this.incomingItems;

    this.selectValue = this.items.includes(this.incomingItemValue)
      ? this.incomingItemValue
      : this.items[0];

    this.selectLabel = this.selectName;
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
