<template>
  <v-checkbox
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
    field: String,
    fieldTitle: String,
    labelName: String,
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
        this.$forceUpdate()

    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue) {
        const data = this.getPreparedDataTable();
  
        const newData = data.map(item => {
          console.log("item = ", item)
          if (item.field_name === this.field) {
            item[this.fieldTitle] = newValue;
          }

          return item;
        });

        this.updatePreparedDataTable(newData);
        this.$forceUpdate()
    },
  },
};
</script>

<style scoped>
.field_name__checkbox {
  width: 100px;
}
</style>
