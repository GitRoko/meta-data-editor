<template>
  <v-select
    v-model="selectValue"
    :items="items"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { typeRules } from "../features/rules";


export default {
  name: "FakerSampleSelect",
  props: {
    incomingItemValue: String,
    selectName: String,
    fieldTitle: String,
    rowId: String,
    jsonType: String,
    fieldName: String,
    path: String,
  },
  data() {
    return {
      selectValue: "",
      selectLabel: "",
    };
  },
  created() {
    this.selectValue = this.incomingItemValue;


    this.selectLabel = this.selectName;
  },
  computed: {

    items() {
      return typeRules.faker.sample;
    }
  },
  watch: {
    selectValue(newValue, oldValue) {
     
      this.changeSelectValue(newValue, oldValue);
    },
    incomingItemValue(newValue) {
      this.selectValue = newValue;
      // if(newValue !== oldValue) {
      //   this.changeSelectValue(newValue, oldValue);

      // }
    }
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),

    changeSelectValue(newValue) {
      const data = this.getPreparedDataTable();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item.sample = newValue;
          console.log(item);
         
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

      this.updatePreparedDataTable(newData);
    },
  },
};
</script>

<style scoped>
.field_name__selectField {
  width: 150px;
}
</style>
