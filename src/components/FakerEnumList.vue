<template>
  <v-list class="text-center pt-4">
    <template v-for="(value, index) in values">
      <v-list-item :key="index + getKey()">
        <template v-slot>
          <v-list-item-content class="py-0">
            <EnumTextField 
            :incomingValue="value" 
            :index="index" 
            :path="path"
            :jsonType="currentField.json_type"
             />
          </v-list-item-content>

          <v-list-item-action class="minus">
            <v-btn icon small fab @click="removeitem(index)">
              <v-icon color="blue">mdi-minus</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </template>
    <v-list-item class="justify-center">

    <v-btn icon small fab @click="addItem" >
      <v-icon color="red">mdi-plus</v-icon>
    </v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { v4 as uuidv4 } from "uuid";
import EnumTextField from "./EnumTextField.vue";
import { getExample } from "../features/helperFunctions.js";


export default {
  name: "FakerEnumList",
  components: {
    EnumTextField,
  },
  props: {
    incomingValue: Array,
    path: String,
    rowId: String,
  },
  data() {
    return {
      selected: [0],
      allData: null,
      currentField: null,
      values: [],
    };
  },
  created() {
      this.allData = this.$store.getters.getPreparedDataTable;
      this.currentField = this.allData.find(item => item.rowId === this.path);
      this.values = this.currentField.faker.values;
  },
  watch: {
    // values(newValue, oldValue) {
    //   this.updateData(newValue, oldValue);
    // },
    // incomingValue(newV) {
    //   this.bpm = newV;
    // },
  },
  methods: {
      ...mapGetters(["getPreparedDataTable"]),
      ...mapMutations(["updatePreparedDataTable"]),
      updateData(newValue) {
        
        const changeValue = (item) => {
          if (item.rowId === this.path) {
            item.faker.values = newValue;
          } else {
            if (item.faker) {
              changeValue(item.faker);
            }
          }
        };
        const newData = this.allData.map((item) => {
          changeValue(item);
          return item;
        });
        this.updatePreparedDataTable(newData);
      },
      removeitem(index) {
        this.values.splice(index, 1)
        this.updateData(this.values);
      },
      addItem() {
        this.values.push(getExample(this.currentField.json_type))
        this.updateData(this.values);
      },
    getKey() {
      return uuidv4();
    }
  },
  computed: {
    
  },
};
</script>

<style scoped>
.minus {
position: absolute;
    right: -25px;
}
</style>
