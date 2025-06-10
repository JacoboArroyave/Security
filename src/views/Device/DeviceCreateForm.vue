<template>
  <Form
    :initial-object="initialDevice"
    :fields="fields"
    :validator="(field, value) => DeviceValidator.validateField(field, value)"
    :service="deviceService"
    title="Crear Dispositivo"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { DeviceValidator } from '../../utils/DeviceValidators';
import DeviceService from '../../service/DeviceService';
import type { Device } from '../../models/Device';

const initialDevice = {
  name: '',
  ip: '',
  operating_system: ''
};

const fields = [
  { key: 'name', label: 'Nombre del Dispositivo', type: 'text' },
  { key: 'ip', label: 'Dirección IP', type: 'text' },
  { key: 'operating_system', label: 'Sistema Operativo', type: 'text' }
];

const deviceService = {
  create: (device: Device) => DeviceService.createDevice(device),
  get: (id: number | string) => DeviceService.getDevice(Number(id)),
  update: (id: number | string, device: Device) => DeviceService.updateDevice(Number(id), device)
};
</script>
