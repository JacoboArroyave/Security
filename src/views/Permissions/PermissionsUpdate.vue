<script setup lang="ts">
import { useRoute } from 'vue-router';
import Form from '../../components/Utils/Form.vue';
import PermissionService from '../../service/PermissionService';

const route = useRoute();

// Obtener el ID desde los parámetros de la ruta
const id = route.params.id;

// Objeto inicial vacío para creación/edición
const initialObject = {
  url: '',
  method: '',
  entity: ''
};

// Campos que se mostrarán en el formulario
const fields = [
  { key: 'url', label: 'URL', type: 'text' },
  { key: 'method', label: 'Método', type: 'text' },
  { key: 'entity', label: 'Entidad', type: 'text' }
];

// Validador básico de campos
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

// Objeto de servicio con métodos para get, create y update
const service = {
  get: PermissionService.getPermission,
  create: PermissionService.createPermission,
  update: PermissionService.updatePermission
};
</script>

<template>
  <Form
    :id="id"
    :initialObject="initialObject"
    :fields="fields"
    :validator="validate"
    :service="service"
    title="Actualizar Permiso"
  />
</template>
