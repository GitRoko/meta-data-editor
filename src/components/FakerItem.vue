<template>
  <v-container class="py-0">
    <v-divider class="mb-4"></v-divider>
    <v-row dense class="py-0">
      <v-col cols="2" dense>
        <FakerSelectType
          :rowId="itemFaker.rowId"
          :jsonType="jsonType"
          :fieldTitle="'faker'"
          :fieldName="'type'"
          :selectName="'Faker type'"
          :incomingItemValue="itemFaker.type"
        />
      </v-col>
      <v-col v-if="itemFaker.type === 'sample'"
        cols="2"
        dense
        class="ml-2"
        align-self="center"
      >
        <FakerSampleSelect
          :rowId="itemFaker.rowId"
          :jsonType="'sample'"
          :fieldTitle="'faker'"
          :fieldName="'sample'"
          :selectName="'Dataset'"
          :path="path + ':' + itemFaker.rowId"
          :incomingItemValue="itemFaker.sample"
        />
      </v-col>
      <v-col v-if="itemFaker.type === 'enum'"
        cols="6"
        dense
        class="pt-3"
        align-self="center"
      >
        <FakerEnumList
          :rowId="itemFaker.rowId"
          :path="path"
        />
      </v-col>
      <v-col v-if="itemFaker.type === 'integer'" dense  align-self="center">
        <v-row>
          <v-col  cols="1" dense>

          </v-col>
          <v-col cols="3" dense class="justify-center" align-self="center">
            <FakerCheckbox
              :rowId="itemFaker.rowId"
              :labelName="'Unique value'"
              :fieldTitle="'unique'"
              :incomingValue="itemFaker.unique"
              :fieldName="'unique'"
            />
          </v-col>

          <v-col cols="2" dense class="" align-self="center" justify="center">
            <FakerCheckbox
              :rowId="itemFaker.rowId"
              :labelName="'to_str'"
              :fieldTitle="'to_str'"
              :incomingValue="itemFaker.to_str"
              :fieldName="'to_str'"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="itemFaker.type === 'code'" dense align-self="center">
        <v-row>
           <v-col cols="3" dense class="ml-6" align-self="center">
            <FakerNumberTextField
              :rowId="itemFaker.rowId"
              :textFieldLabel="'Length'"
              :field="'length'"
              :incomingValue="itemFaker.length"
            />
          </v-col>

          <v-col cols="3" dense class="ml-0 justify-left" align-self="center">
            <FakerCheckbox
              :rowId="itemFaker.rowId"
              :labelName="'Uppercase'"
              :fieldTitle="'upper'"
              :incomingValue="itemFaker.upper"
              :fieldName="'upper'"
            />
          </v-col>
         
        </v-row>
      </v-col>
      <v-col v-if="itemFaker.type === 'foreign'" dense align-self="center">
        <v-row>
          <v-col cols="5" dense class="ml-2" align-self="center">
            <FakerForeignFilesSelect
              :incomingItemValue="itemFaker.dataset"
              :rowId="itemFaker.rowId"
              :selectName="'Dataset'"

             />
          </v-col>

          <v-col  cols="4" dense class="ml-2" align-self="center">
            <FakerForeignFieldSelectedFile
              v-if="itemFaker.dataset.length !== 0"
              :incomingItemValue="itemFaker.field"
              :selectedFile="itemFaker.dataset"
              :rowId="itemFaker.rowId"
              :selectLabel="'Dataset field'"
             />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="itemFaker.type === 'date'" dense align-self="center">
        <v-row>
          <v-col cols="4" dense class="ml-2" align-self="center">
            <FakerTextField
              :incomingValue="itemFaker.format"
              :textFieldLabel="'Format'"
              :field="'format'"
              :rowId="itemFaker.rowId"

             />
          </v-col>

          <v-col v-if="itemFaker.min_year !== undefined" cols="3" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="itemFaker.min_year"
              :textFieldLabel="'Min'"
              :field="'min_year'"
              :dependedFieldValue="itemFaker.max_year"
              :rowId="itemFaker.rowId"
             />
          </v-col>

          <v-col v-if="itemFaker.max_year !== undefined" cols="3" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="itemFaker.max_year"
              :textFieldLabel="'Max'"
              :field="'max_year'"
              :dependedFieldValue="itemFaker.min_year"
              :rowId="itemFaker.rowId"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="itemFaker.type === 'array'" dense align-self="center">
        <v-row>
          <v-col cols="2" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="itemFaker.occurrence_min"
              :textFieldLabel="'Min'"
              :field="'occurrence_min'"
              :dependedFieldValue="itemFaker.occurrence_max"
              :rowId="itemFaker.rowId"
             />
          </v-col>

          <v-col cols="2" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="itemFaker.occurrence_max"
              :textFieldLabel="'Max'"
              :field="'occurrence_max'"
              :dependedFieldValue="itemFaker.occurrence_min"
              :rowId="itemFaker.rowId"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- <v-col>{{ item }}</v-col> -->
    </v-row>
  </v-container>
</template>

<script>
// import { mapGetters, mapMutations } from "vuex";
// import { typeRules } from "../features/rules";
import FakerSelectType from "./FakerSelectType.vue";
import FakerCheckbox from "./FakerCheckbox.vue";
import FakerEnumList from "./FakerEnumList.vue";
import FakerForeignFilesSelect from "./FakerForeignFilesSelect.vue";
import FakerForeignFieldSelectedFile from "./FakerForeignFieldSelectedFile.vue";
import FakerTextField from "./FakerTextField.vue";
import FakerNumberTextField from "./FakerNumberTextField.vue";
import FakerSampleSelect from "./FakerSampleSelect.vue";

export default {
  name: "FakerItem",
  components: {
    FakerSelectType,
    FakerSampleSelect,
    FakerCheckbox,
    FakerEnumList,
    FakerForeignFilesSelect,
    FakerForeignFieldSelectedFile,
    FakerTextField,
    FakerNumberTextField,
  },
  props: {
    item: Object,
    jsonType: String,
    rowId: String,
    path: String,
  },
  data() {
    return {
    //  bpm: 16,
    //   interval: null, 
    };
  },
  created() {},
  watch: {},

  computed: {
    fakerPath() {
      return this.path + ':' + this.item.rowId;
    },
    itemFaker() {
      const item = this.$store.getters.getCurrentFakerItem(this.fakerPath)
      return item;
    }
  },
  methods: {},
};
</script>

<style scoped></style>
