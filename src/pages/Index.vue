<template>
  <q-page padding class="row">
    <div class="col-12 text-center">
      <q-btn-toggle
        v-model="period"
        toggle-color="grey-4"
        toggle-text-color="primary"
        :options="[
          { label: 'כל התקופות', value: 0 },
          { label: 'ימי הביינים', value: 1 },
          { label: 'רנסאנס', value: 2 },
          { label: 'בארוק', value: 3 },
          { label: 'קלאסי', value: 4 },
          { label: 'רומנטי', value: 5 },
          { label: 'מודרני', value: 5 }
        ]"
      />
    </div>
    <div
      class="col-12 col-md-4"
      v-for="comp in comps"
      :key="comp.title"
      v-if="comp.publish"
    >
      <router-link :to="comp.comp_id">
        <q-card class="my-card q-my-lg q-mx-md">
          <q-img
            height="170px"
            :src="comp.image ? `${restServer}${comp.image.url}` : ''"
            :alt="comp.titleHebrew"
          >
            <div class="absolute-bottom text-subtitle2 text-left">
              <span class="headline"
                >{{ comp.titleEnglish }}<br />
                {{ comp.titleHebrew }}</span
              >
            </div>
          </q-img>
        </q-card>
      </router-link>
    </div>
  </q-page>
</template>

<script>
//import MisradLogo from "../components/MisradLogo"

export default {
  data() {
    return {
      comps: [],
      period: 0,
      restServer: process.env.REST_SERVER
    };
  },
  components: {},
  async created() {
    await this.$store.dispatch("Comps/getAllComps");
    this.comps = this.$store.getters["Comps/getAllComps"];
  }
};
</script>

<style lang="scss">
.my-card {
  //width: 100%;
  // max-width: 500px;
}
</style>
