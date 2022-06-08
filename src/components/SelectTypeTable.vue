<template>
  <v-select
    v-model="selectValue"
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
  },
  data() {
    return {
      items: ["string", "number", "array", "object", "boolean"],
      selectValue: "",
    };
  },
  created() {
    this.selectValue = this.incomingValue;
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
            item.json_type = newValue;
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
  width: 250px;
}
</style>
