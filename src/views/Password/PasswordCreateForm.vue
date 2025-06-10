<template>
  <Form
    :initialObject="initialPassword"
    :fields="fields"
    :validator="(fields,value) => PasswordValidator.validateField(fields,value)"
    :service="passwordService"
    title="Crear Contraseña"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { PasswordValidator } from '../../utils/PasswordValidator';
import PasswordService from '../../service/PasswordServices';
import UserService from '../../service/UserService';
import type { Password } from '../../models/Password';
import { ref, onMounted } from 'vue';

const initialPassword = {
  content: '',
  startAt: '',
  endAt: '',
  user_id: ''
};

const users = ref<any[]>([]);
const fields = ref([
  { key: 'content', label: 'Contraseña', type: 'text' },
  { key: 'startAt', label: 'Inicio', type: 'datetime-local', format: 'yyyy-MM-dd HH:mm:ss' },
  { key: 'endAt', label: 'Fin', type: 'datetime-local', format: 'yyyy-MM-dd HH:mm:ss' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

onMounted(async () => {
  const res = await UserService.getUsers();
  users.value = res.data;
  // Reemplaza el objeto field completo para reactividad
  fields.value = fields.value.map(f =>
    f.key === 'user_id'
      ? { ...f, options: users.value.map((u: any) => ({ label: u.name, value: u.id })) }
      : f
  );
  console.log(fields);
  
});

// Formatea la fecha antes de enviar al backend
function formatDateTimeLocalToBackend(value: string) {
  if (!value) return '';
  // value: '2024-01-01T00:00' => '2024-01-01 00:00:00'
  return value.replace('T', ' ') + ':00';
}

const passwordService = {
  create: (password: Password) => {
    const data = {
      ...password,
      startAt: formatDateTimeLocalToBackend(password.startAt),
      endAt: formatDateTimeLocalToBackend(password.endAt)
    };
    return PasswordService.createPassword(password.user_id, data);
  },
  get: (id: string) => PasswordService.getPassword(id)
};
</script>
