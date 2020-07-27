<template>
  <q-page class="column justify-start items-center">
    <q-table
      :pagination="{ rowsPerPage: 100 }"
      title="נתוני הורים ששילמו באתר"
      :data="productSets"
      :columns="columns"
      row-key="schoolName"
      class="q-mt-lg"
    />
  </q-page>
</template>

<script>
import extractResponseMessage from "assets/js/extractResponseMessage";
import { calculateDaysLeft, getHebrewDate } from "assets/js/timeUtils";

export default {
  name: "Login",
  data() {
    return {
      productSets: [],
      columns: [
        {
          name: "schoolName",
          label: "שם בית הספר",
          field: "schoolName",
          align: "left",
          sortable: true
        },
        {
          name: "city",
          label: "עיר",
          field: "city",
          align: "left",
          sortable: true
        },
        {
          name: "daysLeft",
          label: "ימים שנותרו",
          field: "daysLeft",
          align: "left"
        },
        {
          name: "expireDate",
          label: "תאריך סיום",
          field: "expireDate",
          align: "left"
        },
        {
          name: "products",
          label: "מוצרים",
          field: "products",
          align: "left"
        }
      ]
    };
  },
  methods: {
    errorHandler(e) {
      this.$q.dialog({
        title: "שימו לב",
        message: extractResponseMessage(e)
      });
    }
  },
  created() {
    this.$axios
      .get("/api/get_all_product_sets")
      .then(response => {
        this.productSets = response.data.map(p => {
          p.daysLeft = calculateDaysLeft(p.expireDate);
          p.expireDate = getHebrewDate(p.expireDate);
          return p;
        });
      })
      .catch(this.errorHandler);
  }
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
