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
import Form from '../../components/Utils/Form.vue';
import { ref, onMounted } from 'vue';
import RolePermissionService from '../../service/RolePermissionService';
import PermissionService from '../../service/PermissionService';
import RoleService from '../../service/RoleServices';
import { RolePermissionValidator } from '../../../src/utils/RolePermissionValidator';

// Objeto inicial solo con IDs
const initialRolePermission = {
  permission_id: '',
  role_id: ''
};

// Para almacenar roles y permisos
const permissions = ref<any[]>([]);
const roles = ref<any[]>([]);

// Campos del formulario (solo selectores)
const fields = ref([
  { key: 'permission_id', label: 'Permiso', type: 'select', options: [] },
  { key: 'role_id', label: 'Rol', type: 'select', options: [] }
]);

// Cargar opciones desde los servicios
onMounted(async () => {
  const permissionsRes = await PermissionService.getPermissions();
  permissions.value = permissionsRes.data;

  const rolesRes = await RoleService.getRoles();
  roles.value = rolesRes.data;

  fields.value = fields.value.map(field => {
    if (field.key === 'permission_id') {
      return {
        ...field,
        options: permissions.value.map((p: any) => ({ label: p.url, value: p.id }))
      };
    }
    if (field.key === 'role_id') {
      return {
        ...field,
        options: roles.value.map((r: any) => ({ label: r.name, value: r.id }))
      };
    }
    return field;
  });
});

// Servicio personalizado para crear solo con IDs
const rolePermissionService = {
  create: (rp: any) => {
    const validation = RolePermissionValidator.safeParse(rp);
    if (!validation.success) {
      return Promise.reject({ error: 'Validación fallida', details: validation.error });
    }

    return RolePermissionService.createRolePermission(
      rp.role_id,
      rp.permission_id
    );
  }
};
</script>
