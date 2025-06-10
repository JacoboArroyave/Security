  <template>
  <List
    :title="'Lista de Permisos'"
    :headers="['URL', 'Método', 'Entidad']"
    :fields="['url', 'method', 'entity']"
    :items="permissions"
    :createLink="'/permissions/create'"
    :createLabel="'Crear Permiso'"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import type { Permission } from '../../models/Permission';
import PermissionService from '../../service/PermissionService'; 

const permissions = ref<Permission[]>([]);

const fetchPermissions = async () => {
  const res = await PermissionService.getPermissions();
  permissions.value = res.data;
};

const deletePermission = async (id: number) => {
  await PermissionService.deletePermission(id);
  fetchPermissions();
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: Permission) => ({
      to: `/permissions/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: Permission) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => deletePermission(item.id)
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchPermissions);
</script>
