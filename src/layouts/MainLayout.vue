<template>
  <q-layout view="hHh lpR fFf" style="background-color: #edf1f5;">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat size="xl" label="Brand" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    mounted() {},
  };
</script>
