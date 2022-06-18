<template>
  <v-text-field
    class="field_name__textField mt-7"
    v-model="textValue"
    :label="label"
    outlined
    dense
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ExempleTextField",
  props: {
    incomingValue: [String, Number, Boolean, Array, Object],
    textFieldLabel: String,
    field: String,
    rowId: String,
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
      console.log(JSON.stringify(this.incomingValue));

    this.label = this.textFieldLabel;
  },
  watch: {
    textValue(newValue, oldValue) {
      this.changeTextField(newValue, oldValue);
    },
        incomingValue(newV) {
      // this.textValue = newV;
      this.textValue =
      typeof newV === "string"
        ? newV
        : JSON.stringify(newV);
    },
  },
  computed: {
    jsonType() {
      const table = this.$store.state.currentFileData.preparedDataTable;
      if (table) {
        return table.find(item => item.rowId === this.rowId).json_type;
      }
      return "";
    },
    fieldName() {
      const table = this.$store.state.currentFileData.preparedDataTable;
      if (table) {
        return table.find(item => item.rowId === this.rowId).field_name;
      }
      return "";
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue) {
      const data = this.getPreparedDataTable();
        // console.log("data = ", data);

        // console.log("data1 = ", data[this.rowId][this.field]);
        // data[this.rowId][this.field] = newValue;
        // console.log("data2 = ", data[this.rowId][this.field]);

      const newData = data.map((item) => {
        // console.log("item[this.field] = ", item[this.field]);
        // console.log("oldValue = ",  oldValue);
        // console.log("newValue = ",  newValue);
        // console.log("typeof newValue = ",  typeof newValue);
        // console.log("this.jsonType = ", this.jsonType);
        // console.log("parseToType(this.jsonType, newValue) = ", parseToType(this.jsonType, newValue));

        if (item.field_name === this.fieldName) {
          if (this.jsonType !== "string") {
            item[this.field] = JSON.parse(newValue);
          } else {
            item[this.field] = newValue;
          }
        }

        return item;
      });
      // const newData = 

      this.updatePreparedDataTable(newData);
      this.$forceUpdate();
    },
  },
};

// function parseToType(key, value) {

//   switch (key) {
//     case "string": {
//       let newValue;
//       try {
//         newValue = String(value);
//         return newValue;
//       } catch {
//         return value;
//       }
//     }
      
//     case "number":  {
//       let newValue;
//       try {
//         newValue = Number(value);
//         return newValue;
//       } catch {
//         return value;
//       }
//     }

//     case "boolean": {
//       let newValue;
//       try {
//         newValue = Boolean(value);
//         return newValue;
//       } catch {
//         return value;
//       }
//     }
//     case "array": {
//       let newValue;
//       try {
//         newValue =  Array.from(value);
//         return newValue;
//       } catch {
//         return value;
//       }
//     }

//     case "object": {
//       let newValue;
//       try {
//         newValue = Object(value);
//         return newValue;
//       } catch {
//         return value;
//       }
//     }

//     default:
//       break;
//   }
// }
</script>

<style scoped>
.field_name__textField {
  width: 250px;
}
</style>
