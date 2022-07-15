<template>
  <v-select
    @click.native.stop
    v-model="selectValue"

    :items="items"
    label="Type"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getExample } from "../features/helperFunctions.js";
// import { v4 as uuidv4 } from "uuid";
// import { fakerDefaultValue } from "../features/rules";
import { fakerDefaultValue, typeRules } from "../features/rules";

export default {
  name: "SelectTypeTable",
  props: {
    incomingValue: String,
    rowId: String,
    path: String,
  },
  data() {
    return {
      items: ["string", "number", "array", "object", "boolean"],
      selectValue: this.incomingValue,
    };
  },
  created() {
    this.selectValue = this.incomingValue;
  },
  watch: {
    selectValue(newValue, oldValue) {
      this.changeSelectValue(newValue, oldValue);
    },
    incomingValue(newV) {
      this.selectValue = newV;
      this.$forceUpdate();
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),

    // changeSelectValue(newValue) {
    changeSelectValue(newValue, oldValue) {
      const data = this.getPreparedDataTable();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item.json_type = newValue;
          //  const getNewFaker = (type, id) => {
          //   const currentTypeFaker = typeRules.faker[type];
          //   const newFaker = { ...fakerDefaultValue[currentTypeFaker[0]], rowId: id};
          //   return  {...newFaker};
          // }
          if (
            newValue !== oldValue
          ) {
            let newKeys =  Object.keys(fakerDefaultValue[typeRules.faker[newValue][0]]);
            let keys = Object.keys(item.faker);
            keys.forEach((key) => {
              if (key !== "rowId" && key !== "type") {
                delete item.faker[key];
              }
            });
            newKeys.forEach((key) => {
              item.faker[key] = fakerDefaultValue[typeRules.faker[newValue][0]][key];
            });
          }

          if (item.json_type === "array" || item.json_type === "object") {
            item.nested = false;

            if (item.array) {
              item.example = ["Some string"];
              delete item.array;
            }
            if (item.object) {
              item.example = { id: 123 };
              delete item.object;
            }
          } else {
            delete item.nested;

            if (item.array) {
              item.example = `${getExample(item.json_type)}`;
              delete item.array;
            }
            if (item.object) {
              item.example = `${getExample(item.json_type)}`;
              delete item.object;
            }
          }
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

      this.updatePreparedDataTable(newData);
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.field_name__selectField {
  width: 200px;
}
</style>
