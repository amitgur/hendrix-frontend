<template>
  <q-page
    class="bg-secondary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-primary q-my-md">הרשמת משתמשים לניהול</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="username"
                type="text"
                label="שם משתמש או מייל"
              />
              <q-input
                square
                filled
                clearable
                v-model="name"
                type="text"
                label="שמו של בעל החשבון"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="סיסמא"
              />
              <q-input
                square
                filled
                v-model="magicWord"
                type="text"
                label="מילת קסם"
              />

              <q-select
                filled
                multiple
                style="padding-bottom: 32px"
                v-model="schools"
                :options="schoolNamesOptions"
                hint="מוסד לימודים"
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
              label="הרשמה"
              @click="signUp"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import extractResponseMessage from "../../assets/js/extractResponseMessage";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      magicWord: "",
      name: "",

      schools: [],
      schoolNamesOptions: []
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
    signUp() {
      const user = {
        username: this.username,
        password: this.password,
        magicWord: this.magicWord,
        name: this.name,
        schools: this.schools
      };
      this.$axios
        .post("/api/sign_up", user)
        .then(response => {
          // route to login
          this.$q.dialog({
            title: "הודעה",
            message: "משתמש חדש נוצר בהצלחה"
          });
        })
        .catch(error => {
          this.errorHandler(error);
        });
    }
  },
  created() {
    // check for existing login
    this.$store.dispatch("Auth/checkSignIn");
    this.$axios
      .get("/api/all_schools", { params: { city: this.city } })
      .then(response => {
        this.schoolNamesOptions = response.data.map(obj => {
          return obj.schoolName;
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
