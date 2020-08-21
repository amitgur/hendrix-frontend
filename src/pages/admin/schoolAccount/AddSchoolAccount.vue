<template>
  <q-page
    class="bg-secondary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-primary q-my-md">יצירת רשומת בית ספר</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="studentsNumber"
                type="number"
                label="מספר תלמידים"
              />
              <q-select
                filled
                style="padding-bottom: 32px"
                v-model="school"
                :options="allSchools"
                hint="בחר בית ספר"
              >
              </q-select>
              <q-select
                filled
                multiple
                style="padding-bottom: 32px"
                v-model="teachers"
                :options="allTeachers"
                hint="בחר מורים"
              >
              </q-select>
              <q-input
                square
                filled
                clearable
                v-model="details"
                type="textarea"
                label="הערות"
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
              @click="saveSchoolAccount"
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
      school: null,
      allSchools: [],
      teachers: [],
      allTeachers: [],
      studentsNumber: 0,
      details: null
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
    saveSchoolAccount() {
      const schoolAccount = {
        studentsNumber: Number(this.studentsNumber),
        schoolName: this.school.label,
        schoolId: this.school.val,
        teachers: this.teachers.map(t => {
          return { name: t.label, id: t.val };
        }),
        details: this.details
      };

      this.$axios
        .post("/apiV1/create_school_account", schoolAccount)
        .then(response => {
          // route to login
          this.$q.dialog({
            title: "הודעה",
            message: "רשומה נוצרה בהצלחה"
          });
        })
        .catch(error => {
          this.errorHandler(error);
        });
    }
  },
  created() {
    this.$axios
      .get("/apiV1/get_teachers")
      .then(response => {
        this.allTeachers = response.data.map(p => {
          return { val: p._id, label: p.name };
        });

        this.$axios.get("/apiV1/get_schools").then(response => {
          console.log(response);
          this.allSchools = response.data.map(p => {
            return { val: p._id, label: `${p.schoolName} - ${p.city}` };
          });
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
