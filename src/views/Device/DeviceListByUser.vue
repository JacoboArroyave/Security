<template>
  <List
    :title="'Dispositivos del Usuario'"
    :headers="headers"
    :fields="fields"
    :items="devices"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DeviceService from '../../service/DeviceService';

const route = useRoute();
const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const headers = ['ID', 'Nombre', 'IP', 'Sistema Operativo'];
const fields = ['id', 'name', 'ip', 'operating_system'];
const devices = ref([]);


onMounted(async () => {
  if (!userId) return;
  const res = await DeviceService.getDevicesByUserId(String(userId));
  devices.value = res.data;
});
</script>
