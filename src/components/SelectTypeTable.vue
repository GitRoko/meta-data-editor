<template>
  <v-select
  @click.native.stop
    :value="selectValue"
    @input="changeSelectValue"
    :items="items"
    label="Type"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SelectTypeTable",
  props: {
    incomingValue: String,
    field: String,
    rowId: String,
  },
  data() {
    return {
      items: ["string", "number", "array", "object", "boolean"],
      selectValue: this.incomingValue,
    };
  },
  created() {
    this.selectValue = this.incomingValue;
  },
  watch: {
    selectValue(newValue, oldValue) {
      this.changeSelectValue(newValue, oldValue);

    },
    incomingValue(newV) {
      this.selectValue = newV;
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),

    changeSelectValue(newValue) {
      const data = this.getPreparedDataTable();

      const newData = data.map((item) => {

        if (item.rowId === this.rowId) {
            item.json_type = newValue;
        }

        return item;
      });

      this.updatePreparedDataTable(newData);
      this.$forceUpdate();

    },
  },
};
</script>

<style scoped>
.field_name__selectField {
  width: 200px;
}
</style>
