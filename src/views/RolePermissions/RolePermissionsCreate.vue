<template>
  <Form
    :initial-object="initialRolePermission"
    :fields="fields"
    :validator="(field, value) => RolePermissionValidator.validateField(field, value)"
    :service="rolePermissionService"
    title="Crear Relación Rol-Permiso"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Form from '../../components/Utils/Form.vue';
import RolePermissionService from '../../service/RolePermissionService';
import PermissionService from '../../service/PermissionService';
import RoleService from '../../service/RoleServices';
import { RolePermissionValidator } from '../../../src/utils/RolePermissionValidator';

// Objeto inicial para el formulario
const initialRolePermission = {
  permission_id: '',
  role_id: '',
};

// Campos del formulario (los options se llenan luego)
const fields = ref([
  { key: 'permission_id', label: 'Permiso', type: 'select', options: [] },
  { key: 'role_id', label: 'Rol', type: 'select', options: [] },
]);

// Cargar roles y permisos cuando se monta el componente
onMounted(async () => {
  const [permissionsRes, rolesRes] = await Promise.all([
    PermissionService.getPermissions(),
    RoleService.getRoles(),
  ]);

  const permissions = permissionsRes.data;
  const roles = rolesRes.data;

  fields.value = fields.value.map((field) => {
    if (field.key === 'permission_id') {
      return {
        ...field,
        options: permissions.map((p: any) => ({
          label: `${p.method} → ${p.url}`,
          value: p.id,
        })),
      };
    }
    if (field.key === 'role_id') {
      return {
        ...field,
        options: roles.map((r: any) => ({
          label: r.name,
          value: r.id,
        })),
      };
    }
    return field;
  });
});

// Servicio personalizado con validación antes de crear
const rolePermissionService = {
  create: (rp: any) => {
    const validation = RolePermissionValidator.safeParse(rp);
    if (!validation.success) {
      return Promise.reject({
        error: 'Validación fallida',
        details: validation.error,
      });
    }
    return RolePermissionService.createRolePermission(
      rp.role_id,
      rp.permission_id
    );
  },
};
</script>
