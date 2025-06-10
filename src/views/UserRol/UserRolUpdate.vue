<template>
  <Form
    :initial-object="initialUserRole"
    :fields="fields"
    :validator="(field, value) => UserRoleValidator.validateField(field, value)"
    :service="userRoleService"
    :id="id"
    title="Actualizar Relación Usuario-Rol"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UserRoleService from '../../service/UserRoleServices';
import UserService from '../../service/UserService';
import RoleService from '../../service/RoleServices';
import { UserRoleValidator } from '../../utils/UserRoleValidator';

const route = useRoute();
const id = route.params.id;
const initialUserRole = ref({ user_id: '', role_id: '', startAt: '', endAt: '' });
const users = ref<any[]>([]);
const roles = ref<any[]>([]);
const fields = ref([
  { key: 'user_id', label: 'Usuario', type: 'select', options: [], disabled: true },
  { key: 'role_id', label: 'Rol', type: 'select', options: [], disabled: true },
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
  // Cargar datos actuales
  const res = await UserRoleService.getUserRole(id);
  initialUserRole.value = {
    user_id: res.data.user_id,
    role_id: res.data.role_id,
    startAt: res.data.startAt || '',
    endAt: res.data.endAt || ''
  };
});
function formatDateTimeLocalToBackend(value: string) {
  if (!value) return '';
  // value: '2024-01-01T00:00' => '2024-01-01 00:00:00'
  return value.replace('T', ' ') + ':00';
}
const userRoleService = {
  get: (id: string | number) => UserRoleService.getUserRole(id),
  update: (id: string | number, ur: any) => UserRoleValidator.safeParse(ur).success ? UserRoleService.updateUserRole(id, { endAt: formatDateTimeLocalToBackend(ur.endAt) }) : Promise.reject({ error: 'Validación fallida' })
};
</script>
