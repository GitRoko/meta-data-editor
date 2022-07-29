<template>
  <v-select
    :value="selectValue"
    @input="changeSelectValue"
    :items="fieldsOptions"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FakerForeignFieldSelectedFile",
  props: {
    incomingItemValue: String,
    rowId: String,
    selectedFile: String,
    selectLabel: String,
    options: Array
  },
  data() {
    return {
      selectValue: "",
    };
  },
  created() {
    this.selectValue = this.incomingItemValue;
    // this.selectValue = this.options.includes(this.incomingItemValue)
    //   ? this.incomingItemValue
    //   : '';

  },
  computed: { 
    ...mapGetters(["getForeignData"]),

    fieldsOptions() {
      if (this.selectedFile !== '') {
        return this.getForeignData.fieldOptions[this.selectedFile];
      } else {
        return [];
      }
    },
  },
  watch: {
    selectValue(newValue, oldValue) {
      this.changeSelectValue(newValue, oldValue);
    },
  },
  methods: {
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),

    changeSelectValue(newValue) {
        const data = this.getPreparedData();
        const changeValue = (item) => {
          if (item.rowId === this.rowId) {
            item.field = newValue;
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
        }
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
/* .field_name__selectField {
  width: 250px;
} */
</style>
