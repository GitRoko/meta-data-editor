<template>
  <v-select
    v-model="selectValue"
    :items="items"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7 justify-center"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { typeRules } from "../../features/rules";

export default {
  name: "DependentSelect",
  props: {
    incomingItemValue: String,
    selectLabel: String,
    fieldTitle: String,
    rowId: String,
    jsonType: String,
  },
  data() {
    return {
      // items: [],
      selectValue: this.incomingItemValue || "",
    };
  },
  created() {
    // this.selectValue = this.incomingItemValue || '';
    // this.selectValue = this.items.includes(this.incomingItemValue)
    //   ? this.incomingItemValue
    //   : '';
  },
  computed: {
    // jsonType() {
    //   const table = this.$store.state.currentFileData.preparedData;
    //   if (table) {
    //     return table.find(item => item.rowId === this.rowId).json_type;
    //     //  return table[this.rowId].json_type;
    //   }
    //   return '';
    // },
    items() {
      const newItems = typeRules[this.fieldTitle][this.jsonType];

      return newItems;
    },
  },
  watch: {
    selectValue(newValue, oldValue) {
      // if (this.items.length === 1) {
      //   const value = this.items[0];
      //   this.changeSelectValue(value, oldValue);
      // } else {

      this.changeSelectValue(newValue, oldValue);
      // }
    },
    items() {
      if (this.items.length === 1) {
        this.selectValue = this.items[0];
      } else {
        this.selectValue = this.items.includes(this.incomingItemValue)
      ? this.incomingItemValue
      : '';
      }
      this.$forceUpdate();

    },
    incomingItemValue(newVal) {
      if (newVal === "" && this.items.length === 1) {
        // this.selectValue = this.items[0];
        this.changeSelectValue(this.items[0]);
      } else if (newVal === "" && this.items.length > 1) {
        this.selectValue = "";
      } else {
        // this.selectValue = newVal;
      this.changeSelectValue(newVal);

      }
      // this.selectValue = newVal;
      this.$forceUpdate();
    },
  },
  methods: {
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),

    changeSelectValue(newValue) {
      const data = this.getPreparedData();
      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item[this.fieldTitle] = newValue;
        } else {
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
.field_name__selectField {
  width: 150px;
  margin: auto;
}
</style>
