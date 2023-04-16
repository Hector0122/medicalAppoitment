<template>
  <v-layout>
    <v-main>
      <tool-bar />
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import ToolBar from "./layouts/ToolBar.vue";
</script>
