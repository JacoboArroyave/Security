<template>
  <DefaultLayout>

    <router-view />
  </DefaultLayout>
</template>

<script lang="ts">
import DefaultLayout from '../layout/DefaultLayout.vue'

export default {
  name: 'HomeView',
  components: { DefaultLayout }
}
</script>
