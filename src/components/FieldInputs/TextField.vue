<template>
  <v-text-field
    @click.native.stop
    class="field_name__textField mt-7"
    :value="textValue"
    @input="changeTextField"
    :label="label"
    outlined
    dense
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TextField",
  props: {
    incomingValue: String,
    textFieldLabel: String,
    fieldName: String,
    rowId: String,
    path: String,
  },
  data() {
    return {
      textValue: "",
      label: "",
    };
  },
  created() {
    this.textValue =
      typeof this.incomingValue === "string"
        ? this.incomingValue
        : JSON.stringify(this.incomingValue);

    this.label = this.textFieldLabel;
  },
  watch: {
    // textValue(newValue) {
    //   this.changeTextField(newValue);
    // },
    incomingValue(newV) {
      this.textValue = newV;
    },
  },
  computed: {},
  methods: {
    // ...mapGetters(["getPreparedData"]),
    // ...mapMutations(["updatePreparedData"]),
    // ...mapActions(["changeItemFieldName"]),

    // changeTextField(newValue) {
    //   // const item = this.$store.getters.getCurrentItem(this.path)
    //   // item[this.fieldName] = newValue;
    //   // this.changeItemFieldName({
    //   //   path: this.path,
    //   //   fieldName: this.fieldName,
    //   //   newValue: newValue,
    //   //   rowId: this.rowId
    //   // })
    // },
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),
    changeTextField(newValue) {
      const data = this.getPreparedData();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item[this.fieldName] = newValue;
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
.field_name__textField {
  width: 250px;
}
</style>
