<template>
  <q-page class="column justify-start items-center q-mx-xl">
    <h5>רשימת תלמידים</h5>
    <div class="q-pa-md full-width">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              שם התלמיד
            </th>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              ביקורים השבוע
            </th>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              ביקורים החודש
            </th>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              ביקורים השנה
            </th>
          </tr>
          <tr v-for="item in students" :key="item._id">
            <td>
              {{ item.studentName }}
            </td>
            <td>
              {{ item.weekVisits }}
            </td>
            <td>
              {{ item.monthVisits }}
            </td>
            <td>
              {{ item.yearVisits }}
            </td>
          </tr>
        </thead>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "List Students",
  data() {
    return {
      students: []
    };
  },
  created() {
    this.$axios.get("/apiV1/get_students").then(response => {
      //this.students = response.data;
      this.students = [];
    });
  }
};
</script>
