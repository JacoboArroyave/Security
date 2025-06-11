<template>
  <List
    :title="'Direcciones del Usuario'"
    :headers="headers"
    :fields="fields"
    :items="addresses"
    :createLink="createLink"
    :createLabel="'Crear Dirección'"
    :actions="[]"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ServicesAddress from '../../service/ServicesAddress';

const route = useRoute();
const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const headers = ['ID', 'Calle', 'Número', 'Latitud', 'Longitud'];
const fields = ['id', 'street', 'number', 'latitude', 'longitude'];
const addresses = ref([]);

const createLink = `/addresses-create?user_id=${userId}`;

onMounted(async () => {
  if (!userId) return;
  const res = await ServicesAddress.getAddressesByUserId(String(userId));
  addresses.value = [res.data];
});
</script>
