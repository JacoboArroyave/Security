<template>
  <Form
    :id="deviceId"
    :initial-object="initialDevice"
    :fields="fields"
    :validator="validateDeviceField"
    :service="deviceService"
    title="Editar Dispositivo"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Form from '../../components/Utils/Form.vue';
import { DeviceValidator } from '../../utils/DeviceValidators';
import DeviceService from '../../service/DeviceService';
import type { Device } from '../../models/Device';


const route = useRoute();
const deviceId = Number(route.params.id);
const userId = 1;

const initialDevice = ref<Device>({
  name: '',
  ip: '',
  operating_system: ''
});

onMounted(async () => {
  try {
    const response = await DeviceService.getDevice(deviceId);
    initialDevice.value = response.data;
  } catch (error) {
    console.error('Error al cargar el dispositivo:', error);
  }
});

const fields = [
  { key: 'name', label: 'Nombre del Dispositivo', type: 'text' },
  { key: 'ip', label: 'Dirección IP', type: 'text' },
  { key: 'operating_system', label: 'Sistema Operativo', type: 'text' }
];

const validateDeviceField = (field: string, value: any) => {
  try {
    return DeviceValidator.validateField(field, value);
  } catch (error) {
    return {
      success: false,
      error: {
        errors: [{ message: 'Error de validación' }]
      }
    };
  }
};

const deviceService = {
  create: async (device: Device) => {
    return await DeviceService.createDevice(device, userId);
  },
  get: async (id: number | string) => {
    return await DeviceService.getDevice(Number(id));
  },
  update: async (id: number | string, device: Device) => {
    return await DeviceService.updateDevice(Number(id), device);
  },
  delete: async (id: number | string) => {
    return await DeviceService.deleteDevice(Number(id));
  }
};
</script>
