<template>
  <q-layout view="hHh lpR fFf" style="background-color: #edf1f5;">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-left">
          <q-btn flat size="xl" to="/adminHome" label="Admin" />
          <q-btn
            outline
            v-show="signIn"
            to="/adminSignUp"
            class="q-mx-sm"
            label="Create admin"
          />
          <q-btn
            outline
            v-show="signIn"
            to="/adminLogger"
            class="q-mx-sm"
            label="Logger"
          />
          <q-btn
            outline
            v-show="!signIn"
            to="/adminLogin"
            class="q-mx-sm"
            label="Sign in"
          />
        </q-toolbar-title>
        <q-btn v-show="signIn" :label="name" />
        <q-btn outline v-show="signIn" @click="signOut" label="Sign out" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      hideHeader: false
    };
  },
  methods: {
    signOut() {
      this.$store
        .dispatch("Auth/signOut")
        .then(() => {
          this.$router.push("/adminLogin");
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {
    ...mapGetters({
      signIn: "Auth/getSignIn",
      name: "Auth/getName"
    })
  }
};
</script>
