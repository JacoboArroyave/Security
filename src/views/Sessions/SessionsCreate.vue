<script setup lang="ts">
import { useRoute } from 'vue-router';
import Form from '../../components/Utils/Form.vue';
import SessionService from '../../service/SessionService';

const route = useRoute();
const id = route.params.id;
const userId = route.query.userId || 1; // Puedes recibirlo por query o usar un valor por defecto

const initialObject = {
  token: '',
  expiration: '',
  FACode: '',
  state: '',
  userId: 1 // valor por defecto
};

const fields = [
  { key: 'token', label: 'Token', type: 'text' },
  { key: 'expiration', label: 'Expiración', type: 'datetime-local' },
  { key: 'FACode', label: 'Código FA', type: 'text' },
  { key: 'state', label: 'Estado', type: 'text' },
  { key: 'userId', label: 'ID de Usuario', type: 'number' }
];


const validate = (field: string, value: any) => {
  if (!value || value.toString().trim() === '') {
    return {
      success: false,
      error: {
        errors: [{ message: `El campo ${field} es obligatorio.` }]
      }
    };
  }
  return { success: true };
};

const service = {
  get: SessionService.getSession,
  create: (data: any) => SessionService.createSession(Number(data.userId), data),
  update: SessionService.updateSession
};

</script>

<template>
  <Form
    :id="id"
    :initialObject="initialObject"
    :fields="fields"
    :validator="validate"
    :service="service"
    title="Gestión de Sesión"
  />
</template>
