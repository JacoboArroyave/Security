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

function formatToISO(value: string) {
if (!value) return '';
  // value: '2024-01-01T00:00' => '2024-01-01 00:00:00'
  return value.replace('T', ' ') + ':00';// formato requerido por tu backend
}

// Servicio con los métodos necesarios
const sessionService = {
  update: (id: string, session: Session) => {
    const data = {
      ...session,
       expiration: formatToISO(session.expiration)
    };
    return SessionService.updateSession(id, data); // ← Esto es clave
  },
  get: (id: string) => SessionService.getSession(id)
};

</script>

<template>
  <Form
    :id="id"
    :initialObject="initialObject"
    :fields="fields"
    :validator="validate"
    :service="sessionService"
    title="Gestión de Sesión"
  />
</template>
