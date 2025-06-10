<template>
  <Form
    :initial-object="initialUserRole"
    :fields="fields"
    :validator="(field, value) => UserRoleValidator.validateField(field, value)"
    :service="userRoleService"
    title="Crear Relación Usuario-Rol"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { ref, onMounted } from 'vue';
import UserRoleService from '../../service/UserRoleServices';
import UserService from '../../service/UserService';
import RoleService from '../../service/RoleServices';
import { UserRoleValidator } from '../../utils/UserRoleValidator';

const initialUserRole = {
  user_id: '',
  role_id: '',
  startAt: '',
  endAt: ''
};

const users = ref<any[]>([]);
const roles = ref<any[]>([]);
const fields = ref([
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] },
  { key: 'role_id', label: 'Rol', type: 'select', options: [] },
  { key: 'startAt', label: 'Inicio', type: 'datetime-local', format: 'yyyy-MM-dd HH:mm:ss' },
  { key: 'endAt', label: 'Fin', type: 'datetime-local', format: 'yyyy-MM-dd HH:mm:ss' }
]);

onMounted(async () => {
  const usersRes = await UserService.getUsers();
  users.value = usersRes.data;
  const rolesRes = await RoleService.getRoles();
  roles.value = rolesRes.data;
  fields.value = fields.value.map(f => {
    if (f.key === 'user_id') return { ...f, options: users.value.map((u: any) => ({ label: u.name, value: u.id })) };
    if (f.key === 'role_id') return { ...f, options: roles.value.map((r: any) => ({ label: r.name, value: r.id })) };
    return f;
      });
});
function formatDateTimeLocalToBackend(value: string) {
  if (!value) return '';
  // value: '2024-01-01T00:00' => '2024-01-01 00:00:00'
  return value.replace('T', ' ') + ':00';
}

const userRoleService = {
  create: (ur: any) => {
    const validation = UserRoleValidator.safeParse(ur);
    if (!validation.success) {
      return Promise.reject({ error: 'Validación fallida', details: validation.error });
    }
    console.log(ur);
    
    return UserRoleService.createUserRole(ur.user_id, ur.role_id, {
      startAt:  formatDateTimeLocalToBackend(ur.startAt),
      endAt: formatDateTimeLocalToBackend(ur.endAt)
    });
  },
};
</script>
