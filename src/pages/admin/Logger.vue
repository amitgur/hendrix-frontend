<template>
  <q-page class="column justify-start items-center q-mx-xl">
    <h5>Logger docs for hendrix</h5>
    <div class="q-pa-md full-width">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left" style="white-space:nowrap;width: 1%">Time</th>
            <th class="text-left" style="white-space:nowrap;width: 1%">
              Level
            </th>
            <th class="text-left">Message</th>
          </tr>
          <tr v-for="item in file" :key="item.timestamp">
            <td class="text-left">
              {{ item.timestamp }}
            </td>
            <td class="text-left">
              {{ item.level }}
            </td>
            <td class="text-left">{{ item.message }}</td>
          </tr>
        </thead>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  name: "Logger",
  data() {
    return {
      file: []
    };
  },
  created() {
    this.$axios
      .get("/apiV1/get_logger_docs", { params: { hours: 24 } })
      .then(response => {
        this.file = response.data.file;
        this.file.forEach(m => {
          m.timestamp = date.formatDate(m.timestamp, "DD-MM-YYYY - hh:mm:ss");
        });
      });
  }
};
</script>
