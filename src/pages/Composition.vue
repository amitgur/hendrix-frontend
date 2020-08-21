<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="column scroll overflow-hidden">
        <q-toolbar class="text-primary">
          <q-toolbar-title>
            {{ `${comp.titleEnglish} - ${comp.titleHebrew}` }}
          </q-toolbar-title>
          <q-btn flat round dense size="xl" icon="keyboard_backspace" to="/" />
        </q-toolbar>

        <q-tabs
          v-model="currentTab"
          class="bg-grey-3 text-grey-7"
          active-color="primary"
          indicator-color="purple"
          align="justify"
        >
          <q-tab
            v-for="(tabItem, index) in tabsData"
            :name="tabItem.name"
            :label="tabItem.name"
            :key="index"
          >
          </q-tab>
        </q-tabs>

        <q-tab-panels v-model="currentTab">
          <q-tab-panel
            v-for="(tabItem, index) in tabsData"
            :key="index"
            :name="tabItem.name"
            class="tabs-panels"
          >
            <div class="vimeo-div">
              <vimeo-player
                @ready="onReady"
                :ref="tabItem.key"
                player-width="800"
                :video-id="tabItem.key"
                :player-height="height"
                autoplay="true"
                :options="{ responsive: true }"
              ></vimeo-player>
            </div>

            <article-credit
              v-on:jump-to-part="jumpToPart"
              :parts-data="partsData"
              :video-key="tabItem.key"
              class="q-py-sm block"
            ></article-credit>

            <div class="article-container" v-show="tabItem.article">
              <component
                v-on:seek-video="seekVideo"
                :is="myComponent"
                :video-key="tabItem.key"
              ></component>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MarkdownIt from "markdown-it";
import ArticleCredit from "components/ArticleCredit";
import Vue from "vue";
import { vueVimeoPlayer } from "vue-vimeo-player";
import { scroll } from "quasar";
const { getScrollPosition, setScrollPosition, getScrollTarget } = scroll;

export default {
  name: "Composition",
  components: { vueVimeoPlayer, ArticleCredit },
  data() {
    return {
      md: new MarkdownIt({
        html: true
      }),
      currentTab: 0,
      lastTab: 0,
      compiledHtml: null,
      instanceComp: null,
      height: 500,
      comp: [],
      tabsData: [],
      playerOptions: {
        playerWidth: undefined,
        playerHeight: undefined,
        options: {
          responsive: true
        }
      }
    };
  },
  mounted() {},
  methods: {
    onReady(player) {
      player
        .pause()
        .then(function() {
          // the video was paused
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    seekVideo: function(secs, videoKey) {
      const player = this.$refs[videoKey][0].player;
      player
        .setCurrentTime(secs)
        .then(function(seconds) {
          player
            .pause()
            .then(function() {
              // the video was paused
            })
            .catch(function(error) {
              console.error(error);
            });
        })
        .catch(function(error) {
          console.error(error);
          switch (error.name) {
            case "RangeError":
              // The time is less than 0 or greater than the video's duration
              break;

            default:
              // Some other error occurred
              break;
          }
        });
      const el = getScrollTarget(document.querySelector(".q-page-container"));
      setScrollPosition(el, 0, 500);
    },
    jumpToPart: function(secs, videoKey) {
      const player = this.$refs[videoKey][0].player;
      player
        .setCurrentTime(secs)
        .then(function(seconds) {
          player
            .play()
            .then(function() {
              // the video was paused
            })
            .catch(function(error) {
              console.error(error);
            });
        })
        .catch(function(error) {
          console.error(error);
          switch (error.name) {
            case "RangeError":
              // The time is less than 0 or greater than the video's duration
              break;

            default:
              // Some other error occurred
              break;
          }
        });
      // todo: scroll up
      //this.$vuetify.goTo(0, "easeInQuad");
    },
    convertJsonToArray: function(j) {
      let a = [];

      // convert json from starpi to array for supporting vue loops
      for (let i = 1; i < 100; i++) {
        if (j[i.toString()]) {
          a.push(j[i.toString()]);
        } else {
          break;
        }
      }

      return a;
    },
    compileMarkdown: function(text) {
      text = this.md.render(text);

      // h1 is קקק1
      let re = /קקק1 ([\s\u0590-\u05fe]+) (\d+) קקק1/g;
      text = text.replace(
        re,
        '<h2 v-on:click="$emit(\'seek-video\',$2,videoKey)" class="my-link">$1</h2>'
      );

      // h2 is קקק2
      re = /קקק2 ([\s\u0590-\u05fe]+) (\d+) קקק2/g;
      text = text.replace(
        re,
        '<h2 v-on:click="$emit(\'seek-video\',$2,videoKey)" class="my-link">$1</h2>'
      );

      // h3 is קקק3
      re = /קקק3 ([\s\u0590-\u05fe]+) (\d+) קקק3/g;
      text = text.replace(
        re,
        '<h3 v-on:click="$emit(\'seek-video\',$2,videoKey)" class="my-link">$1</h3>'
      );

      // p is קקקפ
      re = /קקקפ ([\s\u0590-\u05fe]+) (\d+) קקקפ/g;
      text = text.replace(
        re,
        '<p v-on:click="$emit(\'seek-video\',$2,videoKey)" class="my-link">$1</p>'
      );

      // p and b is קקקפב
      re = /קקקפב ([\s\u0590-\u05fe]+) (\d+) קקקפב/g;
      text = text.replace(
        re,
        '<p v-on:click="$emit(\'seek-video\',$2,videoKey)" class="my-link"><b>$1</b></p>'
      );

      // span is קקקט
      re = /קקקט ([\s\u0590-\u05fe]+) (\d+) קקקט/g;
      text = text.replace(
        re,
        '<span v-on:click="$emit(\'seek-video\',$2,videoKey)" class="my-link">$1</span>'
      );

      // images on develop
      if (process.env.DEVELOP) {
        re = /\/images/g;
        text = text.replace(re, "https://anthology.org.il/images");
      }
      // add one root element
      text = "<div>" + text + "</div>";
      return text;
    }
  },
  async created() {
    await this.$store.dispatch("Comps/getAllComps");
    this.comp = this.$store.getters["Comps/getComp"](
      this.$route.params.compositionId
    );

    if (!this.comp) {
      return this.$router.push("/pageNotFound");
    }

    this.tabsData = this.convertJsonToArray(this.comp.tabsData);
    this.currentTab = this.tabsData[0].name;
    this.partsData = this.convertJsonToArray(this.comp.partsData);
    this.compiledHtml = this.compileMarkdown(this.comp.articleHtml);
    this.instanceComp = Vue.compile(this.compiledHtml);
    this.myComponent = Vue.component("my-component", {
      props: ["video-key"],
      template: this.compiledHtml
    });
  }
};
</script>

<style lang="scss">
.vimeo-div {
  max-width: 900px;
  margin: auto;
}

.article-container {
  font-family: "Heebo", sans-serif;
  max-width: 900px;
  margin: auto;
}
.q-tab-panels {
  width: 100%;
  height: 100%;
}
.my-link {
  color: mediumblue;
  text-decoration: underline;
  cursor: pointer;
}
h1 {
  font-size: 48px;
}
h2 {
  font-size: 30px;
  font-weight: 400;
  font-style: italic;
  margin: 0;
  padding: 0;
}
h3 {
  font-weight: bold;
  font-size: 22px;
  margin-top: 12px;
}
p {
  font-size: 18px;
}

.image-block {
  margin-top: 60px;
  text-align: center;
}
.image-block span {
  display: block;
  text-align: center;
}
.image-block img {
  max-width: 900px;
  height: auto;
  width: 100%;
}
.text-center {
  text-align: center;
}
.song-words-right {
  font-size: 16px;
}
.song-words-left {
  font-size: 16px;
  float: left;
  text-align: left;
  direction: ltr;
}
/*
      Toolbar overides
   */
@media only screen and (max-width: 960px) {
  .song-words-right {
    font-size: 14px;
    margin-top: 12px;
  }
  .song-words-left {
    font-size: 14px;
    text-align: left;
    direction: ltr;
  }
  span.song-words-left {
    display: block;
    float: none;
    text-align: right;
  }
  span.song-words-right {
    display: block;
  }
}

.application {
  font-family: "Heebo", sans-serif;
}

.no-underline {
  text-decoration: none;
}
.auto-resizable-iframe {
  margin: 0px auto;
  max-width: 1000px;
}
</style>
