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
              עיר
            </th>
          </tr>
          <tr v-for="item in schools" :key="item.schoolName">
            <td>
              {{ item.schoolName }}
            </td>
            <td>
              {{ item.city }}
            </td>
          </tr>
        </thead>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "List Schools",
  data() {
    return {
      schools: []
    };
  },
  created() {
    this.$axios.get("/apiV1/get_schools").then(response => {
      this.schools = response.data;
    });
  }
};
</script>
