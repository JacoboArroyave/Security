<template>
  <Form
    :initialObject="initialRole"
    :fields="fields"
    :validator="(field, value) => RoleValidator.validateField(field, value)"
    :service="roleService"
    title="Crear Rol"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { RoleValidator } from '../../utils/RoleValidator';
import RoleService from '../../service/RoleServices';
import type { Role } from '../../models/Role';

const initialRole = {
  name: '',
  description: ''
};

const fields = [
  { key: 'name', label: 'Nombre', type: 'text' },
  { key: 'description', label: 'Descripción', type: 'text' }
];

const roleService = {
  create: (role: Role) => RoleService.createRole(role),
  get: (id: number | string) => RoleService.getRole(id)
};
</script>
