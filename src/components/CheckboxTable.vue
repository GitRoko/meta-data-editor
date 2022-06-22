<template>
  <v-checkbox
    @click.native.stop
    v-model="isChecked"
    :label="labelName"
    color="primary"
    hide-details
    class="field_name__checkbox mt-0"
  ></v-checkbox>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CheckboxTable",
  props: {
    incomingValue: Boolean,
    fieldTitle: String,
    labelName: String,
    rowId: String,
  },
  data() {
    return {
      isChecked: true,
      label: "",
    };
  },
  created() {
    this.isChecked = this.incomingValue;
    this.label = this.labelName;
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
          if (item.array) {
            changeValue(item.array);
          }
          if (item.object) {
            changeValue(item.object);
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
  width: 100px;
}
</style>
