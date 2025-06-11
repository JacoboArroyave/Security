<template>
  <Form
    :initialObject="initialSession"
    :fields="fields"
    :validator="(fields, value) => SessionValidator.validateField(fields, value)"
    :service="sessionService"
    title="Crear Sesión"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { ref, onMounted } from 'vue';
import { SessionValidator } from '../../utils/SessionValidator'; 
import SessionService from '../../service/SessionService'; // debes crearlo
import UserService from '../../service/UserService';

const initialSession = {
  token: '',
  expiration: '',
  FACode: '',
  state: '',
  user_id: ''
};

const users = ref<any[]>([]);
const fields = ref([
  { key: 'token', label: 'Token', type: 'text' },
  { key: 'expiration', label: 'Expiración', type: 'datetime-local', format: 'yyyy-MM-dd HH:mm:ss' },
  { key: 'FACode', label: 'Código FA', type: 'text' },
  { key: 'state', label: 'Estado', type: 'text' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

onMounted(async () => {
  const res = await UserService.getUsers();
  users.value = res.data;
  fields.value = fields.value.map(f =>
    f.key === 'user_id'
      ? { ...f, options: users.value.map((u: any) => ({ label: u.name, value: u.id })) }
      : f
  );
});

// Formato de fecha ISO a '2024-12-31T23:59:59Z'
function formatToISO(value: string) {
if (!value) return '';
  // value: '2024-01-01T00:00' => '2024-01-01 00:00:00'
  return value.replace('T', ' ') + ':00';// formato requerido por tu backend
}

const sessionService = {
  create: (session: any) => {
    const data = {
      ...session,
      expiration: formatToISO(session.expiration)
    };
    return SessionService.createSession(session.user_id, data);
  },
  get: (id: string) => SessionService.getSesasion(id)
};
</script>
