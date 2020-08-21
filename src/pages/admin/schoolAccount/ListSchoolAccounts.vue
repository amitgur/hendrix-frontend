<template>
  <q-page class="column justify-start items-center q-mx-xl">
    <h5>רשימת בתי ספר</h5>
    <div class="q-pa-md full-width">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              בית ספר
            </th>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              מספר תלמידים
            </th>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              מורים
            </th>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              הערות
            </th>
          </tr>
          <tr v-for="item in schoolAccounts" :key="item._id">
            <td>
              {{ item.schoolName }}
            </td>
            <td>
              {{ item.studentsNumber }}
            </td>
            <td>
              {{ item.teachers }}
            </td>
            <td>
              {{ item.details }}
            </td>
          </tr>
        </thead>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "ListSchoolAccounts",
  data() {
    return {
      schoolAccounts: []
    };
  },
  created() {
    this.$axios.get("/apiV1/get_school_accounts").then(response => {
      this.schoolAccounts = response.data;
      this.schoolAccounts.forEach(school => {
        school.teachers = school.teachers
          .map(t => {
            return t.name;
          })
          .toString();
      });
    });
  }
};
</script>
