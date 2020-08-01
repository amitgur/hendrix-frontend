<template>
  <q-page class="column justify-start items-center q-mx-xl">
    <h5>לוג אתר האנתולוגיה</h5>
    <div class="q-pa-md full-width">
      <q-markup-table flat dir="ltr">
        <thead>
          <tr>
            <th class="text-right" style="white-space:nowrap;width: 1%">
              Time
            </th>
            <th class="text-right" style="white-space:nowrap;width: 1%">
              Level
            </th>
            <th class="text-right">Message</th>
          </tr>
          <tr v-for="item in file" :key="item.timestamp">
            <td class="text-right">
              {{ item.timestamp }}
            </td>
            <td class="text-right">
              {{ item.level }}
            </td>
            <td class="text-right">{{ item.message }}</td>
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
