<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import UserService from '../../service/UserService';

// Objeto inicial para un nuevo usuario
const initialObject = {
  name: '',
  email: ''
};

// Campos que se mostrarán en el formulario
const fields = [
  { key: 'name', label: 'Nombre', type: 'text' },
  { key: 'email', label: 'Correo electrónico', type: 'email' }
];

// Validador básico
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
  create: UserService.createUser
};
</script>

<template>
  <Form
    :initialObject="initialObject"
    :fields="fields"
    :validator="validate"
    :service="service"
    title="Crear Usuario"
  />
</template>
