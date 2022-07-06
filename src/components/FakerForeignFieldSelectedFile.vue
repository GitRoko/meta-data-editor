<template>
  <v-select
    :value="selectValue"
    @input="changeSelectValue"
    :items="items"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
// import { typeRules } from "../features/rules";

export default {
  name: "FakerForeignFieldSelectedFile",
  props: {
    incomingItemValue: String,
    rowId: String,
    selectedFile: String,
    selectLabel: String,
  },
  data() {
    return {
      items: [],
      selectValue: "",
    };
  },
  created() {
    this.items = this.getFields(this.selectedFile);
    this.selectValue = this.incomingItemValue;

  },
  computed: {
    // itemsForFields() {
    //   if (this.items) {
    //     const currentfile = this.$store.getters.getCurrentFile.fileName.split('.')[0];
    //   const data = this.$store.getters.allFiles;
    //   const list = data.map(item => item.fileName.split('.')[0]);
    //   // console.log(list);

    //   return list.filter(item => item !== currentfile);
    //   }
    //   return [];
    // }
    
  },
  watch: {
    selectValue(newValue, oldValue) {
      this.changeSelectValue(newValue, oldValue);
    },
    selectedFile(newValue) {
      this.getFields(newValue);
      this.selectValue = "";
      this.changeSelectValue("");
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    ...mapActions(["getFileFields"]),

    getFields(fileName) {
      const currentfile = fileName + ".yaml";

      const fileHandleItem = this.$store.getters.allFiles.find(
        (item) => item.fileName === currentfile
      );

      this.getFileFields(fileHandleItem).then((data) => (this.items = data));
    },

    changeSelectValue(newValue) {
        const data = this.getPreparedDataTable();
        const changeValue = (item) => {
          if (item.rowId === this.rowId) {
            item.field = newValue;
          } else {
            // if (item.array) {
            //   changeValue(item.array);
            // }
            if (item.faker) {
              changeValue(item.faker);
            }
            // if (item.object) {
            //   item.object.forEach(item => {
            //     changeValue(item);
            //   })
            // }
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
/* .field_name__selectField {
  width: 250px;
} */
</style>
