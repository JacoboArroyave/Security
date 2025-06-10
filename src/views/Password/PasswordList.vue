<template>
  <List
    :title="'Lista de Contraseñas'"
    :headers="['Contraseña', 'Inicio', 'Fin']"
    :fields="['content', 'startAt', 'endAt']"
    :items="passwords"
    :createLink="'/password-create'"
    :createLabel="'Crear Contraseña'"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import PasswordService from '../../service/PasswordServices';

const passwords = ref([]);

const fetchPasswords = async () => {
  const res = await PasswordService.getPasswords();
  passwords.value = res.data;
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: any) => ({
      to: `/password-update/${item.id}`,
      class: 'action-btn'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: any) => ({
      class: 'action-btn',
      onClick: () => deletePassword(item.id)
    }),
    slot: () => 'Eliminar'
  }
];

const deletePassword = async (id: number | string) => {
  await PasswordService.deletePassword(id);
  fetchPasswords();
};

onMounted(fetchPasswords);
</script>