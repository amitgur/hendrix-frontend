<template>
  <q-page class="bg-grey-2 column justify-center items-center">
    <div>
      <h5 class="text-h5 text-primary q-my-md">רישום מורים חדשים</h5>

      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="username"
              type="email"
              label="מייל"
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
            <q-select
              filled
              multiple
              style="padding-bottom: 32px"
              v-model="schools"
              :options="allSchools"
              hint="בחר בתי ספר"
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
  </q-page>
</template>

<script>
import extractResponseMessage from "assets/js/extractResponseMessage";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      magicWord: "",
      name: "",
      allSchools: [],
      schools: []
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
        schools: this.schools.map(school => {
          return {
            schoolName: school.label,
            id: school.val
          };
        }),
        magicWord: this.magicWord,
        profile: "teacher",
        name: this.name
      };
      this.$axios
        .post("/apiV1/sign_up", user)
        .then(response => {
          // route to login
          this.$q.dialog({
            title: "הודעה",
            message: "הרשמת מורה עברה בהצלחה"
          });
          this.$router.push("teachersLogin");
        })
        .catch(error => {
          this.errorHandler(error);
        });
    }
  },
  created() {
    // check for existing login
    this.$store.dispatch("Auth/checkSignIn");

    // get schools
    this.$axios.get("/apiV1/get_schools").then(response => {
      this.allSchools = response.data;
      this.allSchools = response.data.map(p => {
        return { val: p._id, label: `${p.schoolName} - ${p.city}` };
      });
    });
  }
};
</script>
