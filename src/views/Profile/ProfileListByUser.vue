<template>
  <List
    :title="'Perfil del Usuario'"
    :headers="headers"
    :fields="fields"
    :items="profiles"
    :createLink="createLink"
    :createLabel="'Crear Perfil'"
    :actions="[]"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProfileService from '../../service/ProfileService';

const route = useRoute();
const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const headers = ['ID', 'Teléfono', 'Foto'];
const fields = ['id', 'phone', 'photo'];
const profiles = ref([]);

const createLink = `/profile/create?user_id=${userId}`;

onMounted(async () => {
  if (!userId) return;
  const res = await ProfileService.getProfilesByUserId(String(userId));
  profiles.value = Array.isArray(res.data) ? res.data : [res.data];
});
</script>
