<template>
  <List
    :title="'Relaciones Rol-Permiso'"
    :headers="['ID', 'Permiso', 'Rol']"
    :fields="['id', 'url_permiso', 'role_name']"
    :items="RolePermission"
    :createLink="'/role-permission-create'"
    :createLabel="'Crear Relación'"
    :updateLink="(id) => `/user-permission-update/${id}`"
    :onDelete="onDelete"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from "../../components/Utils/List.vue";
import { ref, onMounted } from "vue";
import RolePermissionService from "../../service/RolePermissionService";
import PermissionService from "../../service/PermissionService";
import RoleService from "../../service/RoleServices";

const RolePermission = ref<any[]>([]);

const fetchRolePermission = async () => {
  const res = await RolePermissionService.getRolePermissions();
  const permissionsRes = await PermissionService.getPermissions();
  const rolesRes = await RoleService.getRoles();
  RolePermission.value = res.data.map((ur: any) => ({
    ...ur,
    url_permiso:
      permissionsRes.data.find((p: any) => p.id === ur.permission_id)?.url ||
      ur.permission_id,
    role_name:
      rolesRes.data.find((r: any) => r.id === ur.role_id)?.name || ur.role_id,
  }));
};

const onDelete = async (id: number | string) => {
  await RolePermissionService.deleteRolePermission(id);
  fetchRolePermission();
};

const actions = [
  {
    component: "router-link",
    getProps: (item: any) => ({
      to: `/role-permissions-update/${item.id}`,
      class: "action-btn",
    }),
    slot: () => "Editar",
  },
  {
    component: "button",
    getProps: (item: any) => ({
      class: "action-btn",
      onClick: () => onDelete(item.id),
    }),
    slot: () => "Eliminar",
  },
];

onMounted(fetchRolePermission);
</script>
