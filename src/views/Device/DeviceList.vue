<template>
  <List
    title="Lista de Dispositivos"
    :headers="['Nombre', 'IP', 'Sistema Operativo']"
    :fields="['name', 'ip', 'operating_system']"
    :items="devices"
    createLink="/devices/create"
    createLabel="Crear Dispositivo"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import List from '../../components/Utils/List.vue';
import DeviceService from '../../service/DeviceService.ts';
import type { Device } from '../../models/Device';

const devices = ref<Device[]>([]);

const fetchDevices = async () => {
  try {
    const res = await DeviceService.getDevices();
    devices.value = res.data;
  } catch (error) {
    console.error('Error al obtener dispositivos:', error);
  }
};

const deleteDevice = async (id: number) => {
  try {
    await DeviceService.deleteDevice(id);
    await fetchDevices();
  } catch (error) {
    console.error('Error al eliminar dispositivo:', error);
  }
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: Device) => ({
      to: `/devices/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: Device) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => {
        if (confirm('¿Estás seguro de eliminar este dispositivo?')) {
          deleteDevice(item.id);
        }
      }
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchDevices);
</script>
