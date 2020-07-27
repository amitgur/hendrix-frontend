<template>
  <q-page
    class="bg-secondary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-primary q-my-md">יצירת רשומת מכירה מרוכזת</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="city"
                type="text"
                label="עיר"
              />
              <q-input
                square
                filled
                clearable
                v-model="schoolName"
                type="text"
                label="בית ספר"
              />
              <p>תאריך סיום מכירה זו</p>
              <q-input
                square
                filled
                clearable
                v-model="expireDate"
                type="date"
              />

              <q-select
                filled
                multiple
                style="padding-bottom: 32px"
                v-model="products"
                :options="allProducts"
                hint="בחר מוצרים"
              >
              </q-select>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="שלח"
              @click="saveProductSet"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import extractResponseMessage from "../../assets/js/extractResponseMessage";
import { calculateDaysLeft, getHebrewDate } from "assets/js/timeUtils";

export default {
  name: "Login",
  data() {
    return {
      allProducts: [],
      products: [],
      expireDate: "",
      city: "",
      schoolName: ""
    };
  },
  methods: {
    errorHandler(e) {
      this.$q.dialog({
        title: "תקלה",
        message: extractResponseMessage(e)
      });
      console.error(e);
    },
    saveProductSet() {
      const productSet = {
        products: this.products.map(p => {
          return { url: p.val, label: p.label };
        }),
        expireDate: this.expireDate,
        city: this.city,
        schoolName: this.schoolName
      };
      this.$axios
        .post("/api/create_product_set", productSet)
        .then(response => {
          // route to login
          this.$q.dialog({
            title: "הודעה",
            message: "רשומה נוצרה בהצלחה"
          });
        })
        .catch(error => {
          this.errorHandler(error);
        });
    }
  },
  created() {
    this.$axios
      .get("/api/get_all_products")
      .then(response => {
        this.allProducts = response.data.map(p => {
          return { val: p.url, label: p.label };
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
