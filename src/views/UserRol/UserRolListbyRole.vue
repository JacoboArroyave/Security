<template>
  <List
    :title="'Usuarios con este Rol'"
    :headers="['ID', 'Nombre', 'Email']"
    :fields="['id', 'name', 'email']"
    :items="users"
    :createLink="ruta"
    :createLabel="'Agregar usuario a este rol'"
    :updateLink="() => ''"
    :onDelete="() => {}"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UserRoleService from '../../service/UserRoleServices';
import UserService from '../../service/UserService';
const route = useRoute();
const users = ref<any[]>([]);
const ruta = ref<string>(''); // define ruta as a ref

const fetchUsersByRole = async () => {
  const roleId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  // Obtener los user_id asociados a este rol
  ruta.value = `/user-role/role/${roleId}`; // update ruta when fetching users

  const res = await UserRoleService.getUsersByRole(roleId);
  const userIds = res.data.map((ur: any) => ur.user_id);
  // Obtener los datos de usuario
  const userRes = await UserService.getUsers();
  users.value = userRes.data.filter((u: any) => userIds.includes(u.id));
};

const deleteUserRole = async (userId: string | number) => {
  const roleId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  console.log(roleId,userId);
  
  // Busca la relación user-role específica
  const res = await UserRoleService.getUsersByRole(roleId);
  const userRole = res.data.find((ur: any) => ur.user_id === userId);
  if (userRole) {
    await UserRoleService.deleteUserRole(userRole.id);
    fetchUsersByRole();
  }
};

const actions = [
  {
    component: 'button',
    getProps: (item: any) => ({
      class: 'action-btn',
      onClick: () => deleteUserRole(item.id)
    }),
    slot: () => 'Eliminar Relación'
  }
];

onMounted(fetchUsersByRole);
</script>
