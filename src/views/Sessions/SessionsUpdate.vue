<script setup lang="ts">
import { useRoute } from 'vue-router';
import Form from '../../components/Utils/Form.vue';
import SessionService from '../../service/SessionService';

const route = useRoute();
const id = route.params.id;

// Objeto inicial para crear/editar sesiones
const initialObject = {
  state: '',
  FACode: '',
  expiration: ''
};

// Campos para el formulario
const fields = [
  { key: 'state', label: 'Estado', type: 'text' },
  { key: 'FACode', label: 'Código FA', type: 'text' },
  { key: 'expiration', label: 'Expiración', type: 'datetime-local' }
];

// Validación básica
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

// Servicio con los métodos necesarios
const service = {
  get: SessionService.getSession,
  create: SessionService.createSession, // requiere userId aparte
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
