<template>
  <v-container>
    <v-row>
      <v-sheet color="white" elevation="0" height="100%" width="100%">
        <v-col cols="12">
          <h2>
            <v-text-field
              v-if="getPreparedDataTable"
              class="field_name__textField mt-7"
              :value="textTitle || title"
              @input="updateTextTitle"
              label="Description"
              outlined
              dense
            ></v-text-field>
          </h2>
          <ExpansionPanelsData
            v-if="getPreparedDataTable"
            :initialData="getPreparedDataTable"
          />
          <!-- <DataTable
            v-if="getPreparedDataTable"
            :initialData="getPreparedDataTable"
          /> -->
        </v-col>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
// import DataTable from "../components/DataTable.vue";
import { mapState, mapGetters } from "vuex";
import ExpansionPanelsData from "../components/ExpansionPanelsData.vue"

export default {
  name: "ContentData",
  components: {
    // DataTable,
    ExpansionPanelsData,
  },
  props: {
    title: String,
  },
  data() {
    return {
      hasNewData: false,
    };
  },
  computed: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapState({
      textTitle: (state) => state.title,
    }),
  },
  methods: {
    updateTextTitle(e) {
      // console.log("e = ", e);
      this.$store.commit("updateTitle", e);
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
