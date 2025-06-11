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

const users = ref<any[]>([]);

// Objeto editable
const initialDevice = ref<any>({
  name: '',
  ip: '',
  operating_system: '',
  user_id: ''
});

const fields = ref([
  { key: 'name', label: 'Nombre del Dispositivo', type: 'text' },
  { key: 'ip', label: 'Dirección IP', type: 'text' },
  { key: 'operating_system', label: 'Sistema Operativo', type: 'text' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

onMounted(async () => {
  try {
    // Cargar usuarios para el select
    const userRes = await import('../../service/UserService');
    const UserService = userRes.default || userRes;
    const userResponse = await UserService.getUsers();
    users.value = userResponse.data;

    // Cargar datos del dispositivo actual
    const response = await DeviceService.getDevice(deviceId);
    initialDevice.value = response.data;

    // Asignar las opciones del select de usuarios
    fields.value = fields.value.map(field => {
      if (field.key === 'user_id') {
        return {
          ...field,
          options: users.value.map((user: any) => ({
            label: user.name,
            value: user.id
          }))
        };
      }
      return field;
    });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
});

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
  create: async (device: any) => {
    return await DeviceService.createDevice(
      {
        name: device.name,
        ip: device.ip,
        operating_system: device.operating_system
      },
      device.user_id
    );
  },
  get: async (id: number | string) => {
    return await DeviceService.getDevice(Number(id));
  },
  update: async (id: number | string, device: any) => {
    return await DeviceService.updateDevice(
      Number(id),
      {
        name: device.name,
        ip: device.ip,
        operating_system: device.operating_system
      },
      device.user_id
    );
  },
  delete: async (id: number | string) => {
    return await DeviceService.deleteDevice(Number(id));
  }
};
</script>
