<template>
  <v-switch @click.native.stop v-model="nested" :label="'Nested'"></v-switch>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { fakerDefaultValue, typeRules } from "../../features/rules";


export default {
  name: "NestedToggler",
  components: {},
  props: {
    incomingValue: Boolean,
    rowId: String,
    path: String,
  },
  data() {
    return {
      nested: false,
    };
  },
  created() {
    this.nested = this.incomingValue;
  },
  watch: {
    nested(newValue, oldValue) {
      // console.log("newValue = ", newValue, oldValue);
      this.changeNested(newValue, oldValue);
    },
    incomingValue(newV) {
      this.nested = newV;
      this.$forceUpdate();
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeNested(newValue) {
      // console.log("newValue", newValue);

      const data = this.getPreparedDataTable();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item.nested = newValue;
          // eslint-disable-next-line no-debugger
          // debugger;
          const getNewFaker = (type) => {
            const currentTypeFaker = typeRules.faker[type];
            const newFaker = { ...fakerDefaultValue[currentTypeFaker[0]]};
            return  {...newFaker, rowId: uuidv4()};
          }


          if (
            newValue === true &&
            item.json_type === "array" &&
            item.array === undefined
          ) {
            
            
            item.array = {
              json_type: "string",
              mandatory: false,
              pydantic_type: "StrictStr",
              example: "Some string",
              rowId: uuidv4(),
            };
            item.array.faker = getNewFaker(item.array.json_type);

            delete item.example;
          }

          if (
            newValue === true &&
            item.json_type === "object" &&
            item.object === undefined
          ) {
            item.object = [
              {
                field_name: "id",
                json_type: "number",
                mandatory: true,
                pydantic_type: "StrictInt",
                example: 123,
                rowId: uuidv4(),
              },
            ];

            item.object[0].faker = getNewFaker(item.object[0].json_type);

            delete item.example;
           
          }
          if (newValue === false && item.json_type === "array" && item.array) {
            delete item.array;
            item.example = ["Some string"];
           
          }
          if (
            newValue === false &&
            item.json_type === "object" &&
            item.object
          ) {
            delete item.object;
            item.example = { id: 123, name: "abc" };
           
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
