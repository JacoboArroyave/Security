<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import PermissionService from '../../service/PermissionService';
import type { Permission } from '../..//models/Permission';
import { ref } from 'vue';

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

// Objeto inicial vacío para crear
const initialObject = ref<Partial<Permission>>({
  url: '',
  method: '',
  entity: ''
});

// Campos a mostrar
const fields = [
  { key: 'url', label: 'URL', type: 'text' },
  { key: 'method', label: 'Método', type: 'select', options: methodOptions },
  { key: 'entity', label: 'Entidad', type: 'select', options: entityOptions }
];

// Validador simple
const validator = (field: string, value: any) => {
  if (!value || value.trim() === '') {
    return {
      success: false,
      error: { errors: [{ message: 'Este campo es obligatorio' }] }
    };
  }
  return { success: true };
};

// Servicio de creación
const service = {
  create: async (data: Permission) => {
    console.log("Desde Page: creando con data:", data);
    return await PermissionService.createPermission(data);
  }
};
</script>

<template>
  <Form
    :initialObject="initialObject"
    :fields="fields"
    :validator="validator"
    :service="service"
    title="Crear Permiso"
  />
</template>
