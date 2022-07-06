<template>
  <v-expansion-panels 
    v-if="itemsData"
   focusable v-model="panel" multiple>
    <FieldListItem v-for="item in itemsData" :key="item.rowId" :path="item.rowId" />
    
  </v-expansion-panels>
</template>

<script>
import FieldListItem from "./FieldListItem.vue";

export default {
  name: "ExpansionPanelsData",
  components: {
    FieldListItem,
  },
  props: {
    initialData: Array,
  },
  created() {
    this.itemsData = this.$store.getters.getPreparedDataTable;
  },
  data() {
    return {
      itemsData: [],
      panel: [],
    };
  },
  watch: {
    initialData(newV) {
      this.itemsData = newV;
    },
  },
  computed: {
   
  },
  methods: {
  },
};
</script>

<style scoped>
.action-btn {
  margin-left: auto;
}

</style>
