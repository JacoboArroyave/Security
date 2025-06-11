<template>
  <Form
    :initialObject="initialPassword"
    :fields="fields"
    :validator="(fields, value) => PasswordValidator.validateField(fields, value)"
    :service="passwordService"
    title="Crear Contraseña"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { PasswordValidator } from '../../utils/PasswordValidator';
import PasswordService from '../../service/PasswordServices';
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
  const userRes = await import('../../service/UserService');
  const UserService = userRes.default || userRes;
  const userResponse = await UserService.getUsers();
  users.value = userResponse.data;
  fields.value = fields.value.map(field => {
    if (field.key === 'user_id') {
      return {
        ...field,
        options: users.value.map((user: any) => ({ label: user.name, value: user.id }))
      };
    }
    return field;
  });
});

// Formatea la fecha antes de enviar al backend
function formatDateTimeLocalToBackend(value: string) {
  if (!value) return '';
  // value: '2024-01-01T00:00' => '2024-01-01 00:00:00'
  return value.replace('T', ' ') + ':00';
}

const passwordService = {
  create: (password: any) => {
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
