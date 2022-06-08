<template>
  <v-checkbox
    v-model="isChecked"
    label="Required"
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
  },
  data() {
    return {
      isChecked: true,
    };
  },
  created() {
    this.isChecked = this.incomingValue;
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

          if (item.field_name === this.field) {
            item.mandatory = newValue;
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
