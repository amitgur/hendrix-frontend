<template>
  <q-layout view="hHh lpR fFf" style="background-color: #edf1f5;">
    <q-header elevated class="bg-primary text-white" v-show="!hideHeader">
      <q-toolbar>
        <q-toolbar-title class="text-left">
          <q-btn flat size="xl" to="/adminHome" label="רכישה מרוכזת - ניהול" />
          <q-btn
            outline
            v-show="signIn && name === 'עמית גור'"
            to="/adminSignUp"
            class="q-mx-sm"
            label="יצירת מנהל"
          />
          <q-btn
            outline
            v-show="signIn && name === 'עמית גור'"
            to="/adminProductSets"
            class="q-mx-sm"
            label="רשומות רכישה"
          />
          <q-btn
            outline
            v-show="signIn && name === 'עמית גור'"
            to="/adminAddProductSet"
            class="q-mx-sm"
            label="הוספת רשומה"
          />
        </q-toolbar-title>
        <q-btn v-show="signIn" :label="name" />
        <q-btn
          outline
          v-show="signIn"
          @click="hideHeader = !hideHeader"
          class="q-mx-sm"
          label="הדפסה"
        />
        <q-btn outline v-show="signIn" @click="signOut" label="יציאה" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-btn
      class="fixed-top-right q-ma-sm"
      outline
      v-show="hideHeader"
      @click="hideHeader = !hideHeader"
      label="חזור"
    />
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
