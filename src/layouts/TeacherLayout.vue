<template>
  <q-layout view="hHh lpR fFf" style="background-color: #edf1f5;">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-left">
          <!-- admin -->
          <q-btn
            flat
            size="xl"
            to="/teacherHome"
            label="אנתולוגיה ניהול מורים"
          />
          <q-btn outline v-show="signIn" class="q-mx-sm" label="תלמידים">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup to="/adminSignUp">
                  <q-item-section>רשימת תלמידים</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            outline
            v-show="!signIn"
            to="/adminLogin"
            class="q-mx-sm"
            label="כניסה"
          />
        </q-toolbar-title>

        <q-btn v-show="signIn" :label="name" />
        <q-btn outline v-show="signIn" @click="signOut" label="יציאה" />
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
