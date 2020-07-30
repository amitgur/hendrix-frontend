<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="column">
        <q-toolbar class="text-primary">
          <q-toolbar-title>
            {{ `${comp.titleEnglish} - ${comp.titleHebrew}` }}
          </q-toolbar-title>
          <q-btn flat round dense size="xl" icon="keyboard_backspace" to="/" />
        </q-toolbar>

        <!--    <v-tabs v-model="currentTab" centered fixed-tabs>-->
        <!--      <v-tab v-for="(tabItem, index) in tabsData" :key="index">-->
        <!--        {{ tabItem.name }}-->
        <!--      </v-tab>-->

        <!--      <v-tabs-items v-model="currentTab">-->
        <!--        <div v-for="(tabItem, index) in tabsData" :key="index">-->
        <!--          <v-tab-item>-->
        <!--            <client-only placeholder="Loading..">-->
        <!--              <div class="vimeo-div">-->
        <!--                <vimeo-player-->
        <!--                  @ready="onReady"-->
        <!--                  :ref="tabItem.key"-->
        <!--                  player-width="800"-->
        <!--                  :video-id="tabItem.key"-->
        <!--                  :player-height="height"-->
        <!--                  autoplay="true"-->
        <!--                  :options="{ responsive: true }"-->
        <!--                ></vimeo-player>-->
        <!--              </div>-->
        <!--            </client-only>-->

        <!--            <article-credit-->
        <!--              v-on:jump-to-part="jumpToPart"-->
        <!--              :parts-data="partsData"-->
        <!--              :video-key="tabItem.key"-->
        <!--            ></article-credit>-->

        <!--            &lt;!&ndash; ARTICLE &ndash;&gt;-->
        <!--            <v-container class="article-container" v-show="tabItem.article">-->
        <!--              <component-->
        <!--                v-on:seek-video="seekVideo"-->
        <!--                :is="myComponent"-->
        <!--                :video-key="tabItem.key"-->
        <!--              ></component>-->
        <!--            </v-container>-->
        <!--          </v-tab-item>-->
        <!--        </div>-->
        <!--      </v-tabs-items>-->
        <!--    </v-tabs>-->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "Composition",
  data() {
    return {
      comp: {}
    };
  },
  async created() {
    await this.$store.dispatch("Comps/getAllComps");
    this.comp = this.$store.getters["Comps/getComp"](
      this.$route.params.compositionId
    );
    console.log(this.comp);
  }
};
</script>

<style scoped></style>
