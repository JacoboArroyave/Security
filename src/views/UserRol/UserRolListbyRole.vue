<template>
  <List
    :title="'Usuarios con este Rol'"
    :headers="['ID', 'Nombre', 'Email']"
    :fields="['id', 'name', 'email']"
    :items="users"
    :createLink="''"
    :createLabel="''"
    :updateLink="() => ''"
    :onDelete="() => {}"
    :actions="[]"
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

const fetchUsersByRole = async () => {
  const roleId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  // Obtener los user_id asociados a este rol
  const res = await UserRoleService.getUsersByRole(roleId);
  const userIds = res.data.map((ur: any) => ur.user_id);
  // Obtener los datos de usuario
  const userRes = await UserService.getUsers();
  users.value = userRes.data.filter((u: any) => userIds.includes(u.id));
};

onMounted(fetchUsersByRole);
</script>
