<template>
  <v-list class="text-center pt-4">
    <template v-if="values.length > 0">
      <v-list-item v-for="(value, index) in values" :key="index + getKey()">
        <template v-slot>
          <v-list-item-content class="py-0">
            <EnumTextField 
            :incomingValue="value" 
            :index="index" 
            :path="path"
            :rowId=" rowId"
            :jsonType="jsonType"
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
import { getExample } from "../../features/helperFunctions.js";


export default {
  name: "FakerEnumList",
  components: {
    EnumTextField,
  },
  props: {
    incomingValue: Array,
    path: String,
    rowId: String,
    jsonType: String,
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
      this.allData = this.$store.getters.getPreparedData;
      this.currentField = this.$store.getters.getCurrentItem(this.path);
      this.values = this.currentField.values || [];
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
      ...mapGetters(["getPreparedData"]),
      ...mapMutations(["updatePreparedData"]),
      updateData(newValue) {
        
        const changeValue = (item) => {
          if (item.rowId === this.rowId) {
            item.values = newValue;
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
        };
        const newData = this.allData.map((item) => {
          changeValue(item);
          return item;
        });
        this.updatePreparedData(newData);
      },
      removeitem(index) {
        this.values.splice(index, 1)
        this.updateData(this.values);
      },
      addItem() {
        this.values.push(getExample(this.jsonType))
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
