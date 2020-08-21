<template>
  <q-page
    class="bg-secondary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-primary q-my-md">יצירת בית ספר</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="schoolName"
                type="text"
                label="בית ספר"
              />
            </q-form>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="city"
                type="text"
                label="עיר"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="שלח"
              @click="saveSchool"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import extractResponseMessage from "assets/js/extractResponseMessage";

export default {
  name: "Login",
  data() {
    return {
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
    saveSchool() {
      const school = {
        city: this.city,
        schoolName: this.schoolName
      };
      this.$axios
        .post("/apiV1/create_school", school)
        .then(response => {
          // route to login
          this.$q.dialog({
            title: "הודעה",
            message: "בית ספר נוצר בהצלחה"
          });
        })
        .catch(error => {
          this.errorHandler(error);
        });
      this.$router.push("adminListSchools");
    }
  }
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
