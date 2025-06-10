<script setup lang="ts">
import { useRoute } from 'vue-router';
import Form from '../../components/Utils/Form.vue';
import PermissionService from '../../service/PermissionService';
import { ref } from 'vue';

const route = useRoute();

// Obtener el ID desde los parámetros de la ruta
const id = route.params.id;

// Objeto inicial vacío para creación/edición
const initialObject = {
  url: '',
  method: '',
  entity: ''
};

const methodOptions = [
  { label: 'GET', value: 'get' },
  { label: 'PUT', value: 'put' },
  { label: 'DELETE', value: 'delete' },
  { label: 'GET BY ID', value: 'getbyid' },
  { label: 'UPDATE', value: 'update' }
];

const entityOptions = [
  { label: 'Address', value: 'Address' },
  { label: 'Answer', value: 'Answer' },
  { label: 'Device', value: 'Device' },
  { label: 'DigitalSignature', value: 'DigitalSignature' },
  { label: 'Password', value: 'Password' },
  { label: 'Permission', value: 'Permission' },
  { label: 'Profile', value: 'Profile' },
  { label: 'Role', value: 'Role' },
  { label: 'RolePermission', value: 'RolePermission' },
  { label: 'SecurityQuestion', value: 'SecurityQuestion' },
  { label: 'Session', value: 'Session' },
  { label: 'User', value: 'User' },
  { label: 'UserLogin', value: 'UserLogin' },
  { label: 'UserRole', value: 'UserRole' }
];

// Campos que se mostrarán en el formulario
const fields = [
  { key: 'url', label: 'URL', type: 'text' },
  { key: 'method', label: 'Método', type: 'select', options: methodOptions },
  { key: 'entity', label: 'Entidad', type: 'select', options: entityOptions }
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
