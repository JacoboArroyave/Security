<template>
  <List
    :title="'Lista de Roles'"
    :headers="['Nombre', 'Descripción']"
    :fields="['name', 'description']"
    :items="roles"
    :createLink="'/roles-create'"
    :createLabel="'Crear Rol'"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import RoleService from '../../service/RoleServices';
import type { Role } from '../../models/Role';

const roles = ref<Role[]>([]);

const fetchRoles = async () => {
  const res = await RoleService.getRoles();
  roles.value = res.data;
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: any) => ({
      to: `/roles-update/${item.id}`,
      class: 'action-btn'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'router-link',
    getProps: (item: any) => ({
      to: `/user-rol-list/role/${item.id}`,
      class: 'action-btn'
    }),
    slot: () => 'Ver'
  },
  {
    component: 'button',
    getProps: (item: any) => ({
      class: 'action-btn',
      onClick: () => deleteRole(item.id)
    }),
    slot: () => 'Eliminar'
  }
];

const deleteRole = async (id: number | string) => {
  await RoleService.deleteRole(id);
  fetchRoles();
};

onMounted(fetchRoles);
</script>
