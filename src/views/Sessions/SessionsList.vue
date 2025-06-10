<template>
  <List
    :title="'Lista de Sesiones'"
    :headers="['Token', 'Expiración', 'Código FA', 'Estado']"
    :fields="['token', 'expiration', 'FACode', 'state']"
    :items="sessions"
    :createLink="'/sessions/create'"
    :createLabel="'Crear Sesión'"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import type { Session } from '../../models/Session';
import SessionService from '../../service/SessionService';

const sessions = ref<Session[]>([]);

const fetchSessions = async () => {
  const res = await SessionService.getSessions();
  sessions.value = res.data;
};

const deleteSession = async (id: number) => {
  await SessionService.deleteSession(id);
  fetchSessions();
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: Session) => ({
      to: `/sessions/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: Session) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => deleteSession(Number(item.id))
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchSessions);
</script>
