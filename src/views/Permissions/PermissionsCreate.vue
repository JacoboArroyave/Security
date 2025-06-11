<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import PermissionService from '../../service/PermissionService';
import type { Permission } from '../..//models/Permission';
import { ref } from 'vue';

// Objeto inicial vacío para crear
const initialObject = ref<Partial<Permission>>({
  url: '',
  method: '',
  entity: ''
});

// Campos a mostrar
const fields = [
  { key: 'url', label: 'URL', type: 'text' },
  { key: 'method', label: 'Método', type: 'text' },
  { key: 'entity', label: 'Entidad', type: 'text' }
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
