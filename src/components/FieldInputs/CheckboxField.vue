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
  name: "CheckboxField",
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
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),
    changeTextField(newValue) {
      const data = this.getPreparedData();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item[this.fieldTitle] = newValue;
        } else {
          if (item.array) {
            changeValue(item.array);
          }
          if (item.object) {
            // eslint-disable-next-line no-debugger
            // debugger;
            item.object.forEach(item => {
              changeValue(item);
            })
          }
        }
      };

      const newData = data.map((item) => {
        changeValue(item);

        return item;
      });

      this.updatePreparedData(newData);
    },
  },
};
</script>

<style scoped>
.field_name__checkbox {
  width: 100px;
}
</style>
