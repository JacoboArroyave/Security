<template>
  <List
    :title="'Relaciones Usuario-Rol'"
    :headers="['ID', 'Usuario', 'Rol']"
    :fields="['id', 'user_name', 'role_name']"
    :items="userRoles"
    :createLink="'/user-role-create'"
    :createLabel="'Crear Relación'"
    :updateLink="(id) => `/user-role-update/${id}`"
    :onDelete="onDelete"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import UserRoleService from '../../service/UserRoleServices';
import UserService from '../../service/UserService';
import RoleService from '../../service/RoleServices';

const userRoles = ref<any[]>([]);

const fetchUserRoles = async () => {
  const res = await UserRoleService.getUserRoles();
  const usersRes = await UserService.getUsers();
  const rolesRes = await RoleService.getRoles();
  userRoles.value = res.data.map((ur: any) => ({
    ...ur,
    user_name: usersRes.data.find((u: any) => u.id === ur.user_id)?.name || ur.user_id,
    role_name: rolesRes.data.find((r: any) => r.id === ur.role_id)?.name || ur.role_id
  }));
};

const onDelete = async (id: number | string) => {
  await UserRoleService.deleteUserRole(id);
  fetchUserRoles();
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: any) => ({
      to: `/user-role-update/${item.id}`,
      class: 'action-btn'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: any) => ({
      class: 'action-btn',
      onClick: () => onDelete(item.id)
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchUserRoles);
</script>
