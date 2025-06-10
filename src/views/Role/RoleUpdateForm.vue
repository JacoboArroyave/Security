<template>
  <Form
    :initialObject="initialRole"
    :fields="fields"
    :validator="(field, value) => RoleValidator.validateField(field, value)"
    :service="roleService"
    title="Actualizar Rol"
    :id="roleId"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { RoleValidator } from '../../utils/RoleValidator';
import RoleService from '../../service/RoleServices';
import type { Role } from '../../models/Role';
import { useRoute } from 'vue-router';

const route = useRoute();
const roleId = route.params.id;

const initialRole = {
  name: '',
  description: ''
};

const fields = [
  { key: 'name', label: 'Nombre', type: 'text' },
  { key: 'description', label: 'Descripción', type: 'text' }
];

const roleService = {
  update: (id: number | string, role: Role) => RoleService.updateRole(id, role),
  get: (id: number | string) => RoleService.getRole(id)
};
</script>
