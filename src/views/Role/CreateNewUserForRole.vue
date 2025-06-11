<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Form from '../../components/Utils/Form.vue';
import type { Role } from '../../models/Role';
import UserRoleService from '../../service/UserRoleServices';
import { useRoute } from 'vue-router';

const route = useRoute();
const roleId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const initialUserRole = {
  user_id: ''
};
const users = ref<any[]>([]);
const fields = ref([
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

const validateUserField = (field: string, value: any) => {
  if (field === 'user_id' && !value) {
    return {
      success: false,
      error: { errors: [{ message: 'Seleccione un usuario' }] }
    };
  }
  return { success: true, error: { errors: [] } };
};

onMounted(async () => {
  const res = await import('../../service/UserService');
  const UserService = res.default || res;
  const userRes = await UserService.getUsers();
  users.value = userRes.data;

  // Actualiza SOLO las opciones del campo 'user_id'
  const userField = fields.value.find(f => f.key === 'user_id');
  if (userField) {
    userField.options = users.value.map((u: any) => ({ label: u.name, value: u.id }));
  }
});

const userRoleServices = {
  create: (role: any) => UserRoleService.createUserRole(role.user_id, roleId, {   "startAt": "2024-01-01 00:00:00",
    "endAt" :"2024-12-31 23:59:59"}),
  get: (id: number | string) => UserRoleService.getRole(id)
};
</script>

<template>
  <Form
    :initialObject="initialUserRole"
    :fields="fields"
    :validator="validateUserField"
    :service="userRoleServices"
    title="Crear Usuario para Rol"
  />
</template>