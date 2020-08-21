<template>
  <q-page class="bg-grey-2 column justify-center items-center">
    <div>
      <h5 class="text-h5 text-primary q-my-md">רישום תלמידים חדשים</h5>

      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="baseAccessCode"
              type="text"
              label="קוד בית הספר"
            />
            <q-input
              square
              filled
              clearable
              v-model="name"
              type="text"
              label="שם מלא"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="light-green-7"
            size="lg"
            class="full-width"
            label="הרשמה"
            @click="signUp"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import extractResponseMessage from "assets/js/extractResponseMessage";
export default {
  name: "StudentSignUp",
  data() {
    return {
      username: "",
      baseAccessCode: "",
      name: ""
    };
  },
  methods: {
    errorHandler(e) {
      this.$q.dialog({
        title: "Error",
        message: extractResponseMessage(e)
      });
      console.error(e);
    },
    signUp() {
      const user = {
        baseAccessCode: this.baseAccessCode,
        profile: "teacher",
        name: this.name
      };
      this.$axios
        .post("/apiV1/student_sign_up", user)
        .then(response => {
          // route to login
          this.$q.dialog({
            title: "הודעה",
            message: "הרשמת מורה עברה בהצלחה"
          });
          this.$router.push("/studentsLogin");
        })
        .catch(error => {
          this.errorHandler(error);
        });
    }
  },
  created() {
    // check for existing login
    this.$store.dispatch("Auth/checkSignIn");
  }
};
</script>
