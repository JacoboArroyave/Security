<template>
  <List
    :title="'Sesiones del Usuario'"
    :headers="headers"
    :fields="fields"
    :items="sessions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import SessionService from '../../service/SessionService';

const route = useRoute();
const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const headers = ['ID', 'Token', 'Expiración', 'FA Code', 'Estado'];
const fields = ['id', 'token', 'expiration', 'FACode', 'state'];
const sessions = ref([]);

const createLink = `/sessions/create?user_id=${userId}`;

onMounted(async () => {
  if (!userId) return;
  const res = await SessionService.getSessionsByUserId(String(userId));
  sessions.value = res.data;
});
</script>
