<template>
  <q-page class="bg-grey-2 column justify-center items-center">
    <div class="column" v-if="!isSignIn">
      <h5 class="text-h5 text-primary q-my-md">כניסת מורים</h5>
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="username"
              type="text"
              label="מייל"
            />
            <q-input
              square
              filled
              clearable
              v-model="password"
              type="password"
              label="סיסמא"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="light-green-7"
            size="lg"
            class="full-width"
            label="כניסה"
            @click="signIn"
          />
        </q-card-actions>
      </q-card>
      <q-btn to="/teachersSignUp">הרשמת מורה חדש</q-btn>
    </div>
    <div class="column" v-else>
      <q-btn
        color="primary"
        size="xl"
        @click="$router.push('/teachersHome')"
        label="כניסה לניהול מורים"
      />
    </div>
  </q-page>
</template>

<script>
import extractResponseMessage from "assets/js/extractResponseMessage";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    errorHandler(e) {
      this.$q.dialog({
        title: "Error",
        message: extractResponseMessage(e)
      });
      console.error(JSON.stringify(e, null, 2));
    },
    signIn() {
      const user = {
        username: this.username,
        password: this.password
      };
      this.$axios
        .post("/apiV1/sign_in", user)
        .then(response => {
          // route to homepage
          this.$store.commit("Auth/setSignIn", true);
          this.$store.commit("Auth/setName", response.data.name);
          this.$router.push({ path: "/teachersHome" });
        })
        .catch(error => {
          this.$axios.get("/apiV1/get_message").then(response => {
            const msg = response.data.message ? response.data.message : "Error";
            this.$q.dialog({
              title: "Error",
              message: msg
            });
          });
        });
    }
  },
  computed: {
    isSignIn() {
      return this.$store.getters["Auth/getSignIn"];
    }
  },
  created() {
    // check for existing login
    this.$store.dispatch("Auth/checkSignIn");
  }
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
