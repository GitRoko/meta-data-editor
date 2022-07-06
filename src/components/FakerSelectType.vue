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
import { typeRules, fakerDefaultValue } from "../features/rules";
// import { v4 as uuidv4 } from 'uuid';


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
      // items: [],
      selectValue: "",
      selectLabel: "",
    };
  },
  created() {
    this.selectValue = this.incomingItemValue;
    // this.selectValue = this.items.includes(this.incomingItemValue)
    //   ? this.incomingItemValue
    //   : this.items[0];

    this.selectLabel = this.selectName;
  },
  computed: {
    // jsonType() {
    //   const table = this.$store.state.currentFileData.preparedDataTable;
    //   if (table) {
    //     return table.find(item => item.rowId === this.rowId).json_type;
    //     //  return table[this.rowId].json_type;
    //   }
    //   return '';
    // },
    items() {
      return typeRules[this.fieldTitle][this.jsonType];
    }
  },
  watch: {
    selectValue(newValue, oldValue) {
      console.log('newValue = ', newValue, 'oldValue = ', oldValue);
      console.log('fakerDefaultValue = ', fakerDefaultValue);
      this.changeSelectValue(newValue, oldValue);
    },
    incomingItemValue(newValue, oldValue) {
      this.selectValue = newValue;
      if(newValue !== oldValue) {
        this.changeSelectValue(newValue, oldValue);

      }
    }
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),

    changeSelectValue(newValue, oldValue) {
      const data = this.getPreparedDataTable();
      console.log(newValue, oldValue);

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          if (newValue !== oldValue && oldValue !== '') {
            // console.log('oldValue', oldValue, typeof oldValue);
            // item[this.fieldName] = newValue;
          let newKeys = Object.keys(fakerDefaultValue[newValue]);
          let keys = Object.keys(item);
              console.log(item);
          keys.forEach(key => {
            if (key !== 'rowId' && key !== 'type') {
              console.log(item);
              delete item[key]
              console.log(item);
            }
          });
             newKeys.forEach(key => {
              item[key] = fakerDefaultValue[newValue][key]            
            });
          } 
          // else {
          // eslint-disable-next-line no-debugger
          // debugger;

            // keys = Object.keys(newItem);
            // keys.forEach(key => {
            //   item[key] = newItem[key]            
            // });
            // item.rowId = uuidv4();
          // }
        } else {
          if (item.faker) {
            // console.log('else item.faker');
            changeValue(item.faker);
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
