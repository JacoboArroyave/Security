<template>
  <List
    :title="'Relaciones Rol-Permiso'"
    :headers="['ID', 'Permiso', 'Rol']"
    :fields="['id', 'url_permiso', 'role_name']"
    :items="RolePermission"
    :createLink="'/role-permission-create'"
    :createLabel="'Crear Relación'"
    :updateLink="(id) => `/role-permissions-update/${id}`"
    :onDelete="onDelete"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import List from "../../components/Utils/List.vue";
import RolePermissionService from "../../service/RolePermissionService";
import PermissionService from "../../service/PermissionService";
import RoleService from "../../service/RoleServices";

const RolePermission = ref<any[]>([]);

const fetchRolePermission = async () => {
  const [rolePermissionRes, permissionsRes, rolesRes] = await Promise.all([
    RolePermissionService.getRolePermissions(),
    PermissionService.getPermissions(),
    RoleService.getRoles(),
  ]);

  const permissions = permissionsRes.data;
  const roles = rolesRes.data;

  RolePermission.value = rolePermissionRes.data.map((rel: any) => {
    const permiso = permissions.find((p: any) => p.id === rel.permission_id);
    const role = roles.find((r: any) => r.id === rel.role_id);

    return {
      ...rel,
      url_permiso: permiso ? `${permiso.method} → ${permiso.url}` : `ID ${rel.permission_id}`,
      role_name: role?.name || `ID ${rel.role_id}`,
    };
  });
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
