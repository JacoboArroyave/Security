<template>
    <Form :initial-object="initialPassword" :fields="fields" :validator="(fields,value) => PasswordValidator.validateField(fields,value)"
        :service="passwordService" title="Actualizar Contraseña" :id="passwordId" />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { PasswordValidator } from '../../utils/PasswordValidator';
import PasswordService from '../../service/PasswordServices';
import { useRoute } from 'vue-router';
import type { Password } from '../../models/Password';

const route = useRoute();
const passwordId = route.params.id;

const initialPassword = {
    content: '',
    startAt: '',
    endAt: ''
};

const fields = [
    { key: 'content', label: 'Contraseña', type: 'text' },
    { key: 'startAt', label: 'Inicio', type: 'datetime-local', format: 'yyyy-MM-dd HH:mm:ss' },
    { key: 'endAt', label: 'Fin', type: 'datetime-local', format: 'yyyy-MM-dd HH:mm:ss' }
];
function formatDateTimeLocalToBackend(value: string) {
  if (!value) return '';
  // value: '2024-01-01T00:00' => '2024-01-01 00:00:00'
  return value.replace('T', ' ') + ':00';
}


const passwordService = {
    update: (id: string, password: Password) => {
        const data = {
            ...password,
            startAt: formatDateTimeLocalToBackend(password.startAt),
            endAt: formatDateTimeLocalToBackend(password.endAt)
        }; PasswordService.updatePassword(id, data)
    },
    get: (id: string) => PasswordService.getPassword(id)
};
</script>
