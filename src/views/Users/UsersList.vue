<template>
  <List
    :title="'Lista de Usuarios'"
    :headers="['Nombre', 'Correo Electrónico']"
    :fields="['name', 'email']"
    :items="users"
    :createLink="'/users/create'"
    :createLabel="'Crear Usuario'"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import type { User } from '../../models/User';
import UserService from '../../service/UserService';

const users = ref<User[]>([]);

// Cargar usuarios
const fetchUsers = async () => {
  const res = await UserService.getUsers();
  users.value = res.data;
};

// Eliminar usuario
const deleteUser = async (id: number) => {
  await UserService.deleteUser(id);
  fetchUsers();
};

// Acciones (Editar y Eliminar)
const actions = [
  {
    component: 'router-link',
    getProps: (item: User) => ({
      to: `/users/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'router-link',
    getProps: (item: User) => ({
      to: `/password/by-user/${item.id}`,
      class: 'text-green-600 hover:text-green-800 flex items-center'
    }),
    slot: () => 'Ver Contraseñas'
  },
  {
    component: 'router-link',
    getProps: (item: User) => ({
      to: `/profile/by-user/${item.id}`,
      class: 'text-purple-600 hover:text-purple-800 flex items-center'
    }),
    slot: () => 'Ver Perfil'
  },
  {
    component: 'router-link',
    getProps: (item: User) => ({
      to: `/device/by-user/${item.id}`,
      class: 'text-pink-600 hover:text-pink-800 flex items-center'
    }),
    slot: () => 'Ver Dispositivos'
  },
  {
    component: 'router-link',
    getProps: (item: User) => ({
      to: `/digital-signature/by-user/${item.id}`,
      class: 'text-indigo-600 hover:text-indigo-800 flex items-center'
    }),
    slot: () => 'Ver Firmas Digitales'
  },
  {
    component: 'router-link',
    getProps: (item: User) => ({
      to: `/sessions/by-user/${item.id}`,
      class: 'text-cyan-600 hover:text-cyan-800 flex items-center'
    }),
    slot: () => 'Ver Sesiones'
  },
  {
    component: 'router-link',
    getProps: (item: User) => ({
      to: `/addresses/by-user/${item.id}`,
      class: 'text-yellow-600 hover:text-yellow-800 flex items-center'
    }),
    slot: () => 'Ver Direcciones'
  },
  {
    component: 'button',
    getProps: (item: User) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => deleteUser(item.id)
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchUsers);
</script>
