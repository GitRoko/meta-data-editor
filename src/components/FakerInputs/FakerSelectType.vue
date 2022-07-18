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
import { typeRules, fakerDefaultValue } from "../../features/rules";


export default {
  name: "FakerSelectType",
  props: {
    incomingItemValue: String,
    selectName: String,
    fieldTitle: String,
    rowId: String,
    jsonType: String,
    fieldName: String,
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
      return typeRules[this.fieldTitle][this.jsonType];
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

    changeSelectValue(newValue, oldValue) {
      const data = this.getPreparedDataTable();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          if (newValue !== oldValue && oldValue !== '') {
           
          let newKeys = Object.keys(fakerDefaultValue[newValue]);
          let keys = Object.keys(item);
          keys.forEach(key => {
            if (key !== 'rowId' && key !== 'type') {
              delete item[key]
            }
          });
             newKeys.forEach(key => {
              item[key] = fakerDefaultValue[newValue][key]            
            });
          } 
         
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
