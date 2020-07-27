<template>
  <q-page padding class="column items-center justify-center">
    <h2>תודה רבה לכם</h2>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <h5>
          {{ showMessage }}
        </h5>
      </div>
    </div>
    <div class="row">
      <a href="https://bandpad.co">
        <q-btn color="primary" size="xl">לאתר קהילה מנגנת</q-btn>
      </a>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "thankYouPayment",
  data() {
    return {
      showMessage: "התשלום בבדיקה"
    };
  },
  created() {
    // save click on server
    let id = localStorage.getItem("paymentId");
    if (id) {
      this.$axios
        .post(`/api/finished_payment`, { _id: id })
        .then(() => {
          this.showMessage =
            "התשלום הסתיים בהצלחה, נשלחו אליכם חשבונית מס קבלה במייל. המוצרים שרכשתם ישלחו לבית הספר ויחולקו על ידי המורים.";
        })
        .catch(e => {
          console.error(e);
          this.showMessage =
            "אירעה תקלה בזמן התשלום, אנא פנו אלינו בטלפון 053-3222182";
        });
    } else {
      this.showMessage =
        "אירעה תקלה בזמן התשלום, אנא פנו אלינו בטלפון 053-3222182";
    }
    localStorage.removeItem("paymentId");
  }
};
</script>

<style scoped></style>
