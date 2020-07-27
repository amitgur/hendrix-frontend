<template>
  <q-page class="column justify-start items-center">
    <q-select
      v-model="productSetId"
      :options="schools"
      label="בחר בית ספר"
      style="width: 300px"
      @input="changeSchool"
      class="q-my-lg"
      filled
    />
    <q-table
      :pagination="{ rowsPerPage: 100 }"
      title="נתוני הורים ששילמו באתר"
      :data="schoolData"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import extractResponseMessage from "assets/js/extractResponseMessage";

export default {
  name: "Login",
  data() {
    return {
      productSetId: null,
      schoolData: [],
      schools: [],
      columns: [
        {
          name: "parentName",
          label: "שם ההורה",
          field: "parentName",
          align: "left",
          sortable: true
        },
        {
          name: "studentName",
          label: "שם התלמיד",
          field: "studentName",
          align: "left",
          sortable: true
        },
        {
          name: "schoolClass",
          label: "כיתה",
          field: "schoolClass",
          align: "left",
          sortable: true
        },
        {
          name: "phone",
          label: "טלפון",
          field: "phone",
          align: "left"
        },
        {
          name: "paymentClick",
          label: "עבר לתשלום",
          field: "paymentClick",
          align: "left",
          sortable: true
        },
        {
          name: "paid",
          label: "שולם",
          field: "paid",
          align: "left",
          sortable: true
        },
        {
          name: "product",
          label: "מוצרים",
          field: "product",
          align: "left",
          sortable: true
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
    },
    changeSchool() {
      console.log(this.productSetId.value);
      this.$axios
        .get("/api/get_school_data", {
          params: { productSetId: this.productSetId.value }
        })
        .then(response => {
          this.schoolData = response.data.map(data => {
            data.paid = data.paid ? "כן" : "לא";
            data.paymentClick = data.paymentClick ? "כן" : "לא";
            return data;
          });
          console.log(this.schoolData);
        })
        .catch(this.errorHandler);
    }
  },
  created() {
    this.$axios
      .get("/api/get_schools_by_user")
      .then(response => {
        this.schools = response.data.map(s => {
          return { label: s.schoolName, value: s._id };
        });
        console.log(this.schools);
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
