<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onMounted} from 'vue'
import {userEntriesStore} from "@/stores/entries"
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
<v-container>

  <RouterView />
</v-container>

</template>
