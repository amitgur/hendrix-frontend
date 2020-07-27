<template>
  <q-page
    class="bg-secondary window-height window-width row justify-center items-center"
  >
    <div class="column" v-if="!isSignIn">
      <div class="row">
        <h5 class="text-h5 text-primary q-my-md">כניסת ניהול</h5>
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
      </div>
    </div>
    <div class="column" v-else>
      <q-btn
        color="primary"
        size="xl"
        @click="$router.push('/adminHome')"
        label="לחץ לכניסה"
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
        title: "תקלה",
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
        .post("api/sign_in", user)
        .then(response => {
          // route to homepage
          this.$store.commit("Auth/setSignIn", true);
          this.$store.commit("Auth/setName", response.data.name);
          this.$router.push({ path: "/adminHome" });
        })
        .catch(error => {
          this.$axios.get("api/get_message").then(response => {
            const msg = response.data.message
              ? response.data.message
              : "אירעה תקלה";
            this.$q.dialog({
              title: "תקלה",
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
