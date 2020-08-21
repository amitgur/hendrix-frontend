<template>
  <q-page class="bg-grey-2 column justify-center items-center">
    <div>
      <h5 class="text-h5 text-primary q-my-md">הרשמת מנהל</h5>

      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="username"
              type="text"
              label="שם משתמש"
            />
            <q-input
              square
              filled
              clearable
              v-model="name"
              type="text"
              label="שם מלא"
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
import extractResponseMessage from "../../assets/js/extractResponseMessage";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      magicWord: "",
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
        username: this.username,
        password: this.password,
        magicWord: this.magicWord,
        name: this.name
      };
      this.$axios
        .post("/apiV1/sign_up", user)
        .then(response => {
          // route to login
          this.$q.dialog({
            title: "Message",
            message: "New admin user was created successfully"
          });
          this.$router.push("adminLogin");
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
