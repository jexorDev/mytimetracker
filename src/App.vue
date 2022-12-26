<script setup lang="ts">
import {onMounted} from 'vue'
import {userEntriesStore} from "@/stores/entries"
import TimeEntry from "@/components/TimeEntry.vue";
onMounted(() => {
  const store = userEntriesStore();
  store.refresh();
});
</script>

<template>

  <!-- <v-container>
<v-row>
  <nav>
    <RouterLink to="/">Time Entry</RouterLink>
    <RouterLink to="/stats">Stats</RouterLink>
  </nav>

</v-row>
<v-row>
  
</v-row>
</v-container> -->
<v-layout>
  <v-main>
    <TimeEntry />
  </v-main>
</v-layout>

</template>
