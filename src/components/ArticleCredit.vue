<template>
  <div class="credit-div">
    <p class="article-credit-line">
      כתיבת מאמר ותסריט: ד"ר רון וידברג, עריכת וידאו: הדר אופנהיימר וניר קדם
    </p>
    <div class="links-div">
      <div
        class="links-item"
        v-for="part in partsData"
        v-on:click="$emit('jump-to-part', part.sec, videoKey)"
      >
        {{ part.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCredit",
  props: ["parts-data", "video-key"]
};
</script>

<style lang="scss">
.credit-div {
  max-width: 900px;
  margin: auto;
}

.article-credit-line {
  font-size: 14px;
  font-family: "Heebo", sans-serif;
  max-width: 800px;
}
.links-div {
  display: block;
  list-style-type: none;
}
.links-item {
  padding: 20px;
  font-size: 19px;
  text-decoration: underline;
  color: darkblue;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
}

@media only screen and (max-width: 960px) {
  .article-credit-line {
    font-size: 10px;
  }
  .links-item {
    padding: 6px;
    font-size: 12px;
  }
}
</style>
