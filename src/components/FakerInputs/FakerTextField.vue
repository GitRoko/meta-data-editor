<template>
  <v-text-field
    @click.native.stop
    class="mt-7"
    :value="textValue"
    @input="changeTextField"
    :label="label"
    outlined
    dense
    min="0"
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FakerTextField",
  props: {
    incomingValue: String,
    textFieldLabel: String,
    field: String,
    rowId: String,
  },
  data() {
    return {
      textValue: "",
      label: "",
    };
  },
  created() {
    this.textValue = this.incomingValue;
    this.label = this.textFieldLabel;
  },
  watch: {
    textValue(newValue) {
      // console.log("change ", oldValue, newValue);
      this.changeTextField(newValue);
    },
    incomingValue(newV) {
      this.textValue = newV;
    },
  },
  computed: {},
  methods: {
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),
    changeTextField(newValue) {
      // console.log(newValue);
      // eslint-disable-next-line no-debugger
      // debugger;
      const data = this.getPreparedData();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          // console.log(item);
          item[this.field] = newValue;
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
.field_name__textField {
  width: 250px;
}
</style>
