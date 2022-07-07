<template>
  <v-checkbox
    @click.native.stop
    v-model="isChecked"
    :label="labelName"
    color="primary"
    hide-details
    class="field_name__checkbox px-0 mt-0 ml-2"
  ></v-checkbox>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FakerCheckbox",
  props: {
    incomingValue: Boolean,
    fieldTitle: String,
    labelName: String,
    rowId: String,
    path: String
  },
  data() {
    return {
      isChecked: true,
      label: "",
    };
  },
  created() {
    this.isChecked = this.incomingValue;
  },
  watch: {
    isChecked(newValue, oldValue) {
      this.changeTextField(newValue, oldValue);
    },
    incomingValue(newV) {
      this.isChecked = newV;
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue) {
      const data = this.getPreparedDataTable();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item[this.fieldTitle] = newValue;
        } else {
          if (item.faker) {
            changeValue(item.faker);
          }
        }
      };

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
.field_name__checkbox {
  width: 130px;
}
</style>
