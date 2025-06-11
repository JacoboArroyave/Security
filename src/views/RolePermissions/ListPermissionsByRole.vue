<template>
    <div class="permissions-table-container">
        <h2 class="permissions-title">{{ title }}</h2>
        <table class="permissions-table">
            <thead>
                <tr>
                    <th>Model</th>
                    <th v-for="action in actions" :key="action">{{ action }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entity in entities" :key="entity">
                    <td>{{ entity }}</td>
                    <td v-for="action in actions" :key="action">
                        <input type="checkbox" :checked="hasPermission(entity, action)" disabled />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PermissionService from '../../service/PermissionService';

const route = useRoute();
const roleId = route.params.id;
const permissions = ref<Array<{ entity: string, method: string }>>([]);
const title = ref('Permisos del Rol');

const actions = ['View', 'List', 'Create', 'Update', 'Delete'];

const entities = computed(() => {
    const set = new Set(permissions.value.map(p => p.entity));
    return Array.from(set);
});
const methods = {
    view: 'get',
    list: 'get',
    create: 'post',
    update: 'put',
    delete: 'delete',
}



function hasPermission(entity: string, action: string) {
    console.log(entity, action, permissions.value);
    let isView = false;
    if (action.toLocaleLowerCase() === 'view') {
        isView = true;
    } 
    const permission = permissions.value.find(p => p.entity.toLocaleLowerCase() === entity.toLocaleLowerCase())
    console.log(permission);

    const res = permission.permissions.find(p => p.method.toLocaleLowerCase() === methods[action.toLocaleLowerCase()] && (isView ? p.url[p.url.length-1]==="?" : true));

    return res?res.has_permission : false;
}

onMounted(async () => {
    // Suponiendo que PermissionService.getPermissionsByRole existe y retorna los permisos del rol
    const res = await PermissionService.getPermissionsByRoleId(roleId);
    console.log(res.data);

    permissions.value = res.data;
});
</script>

<style scoped>
.permissions-table-container {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 32px;
    margin: 32px auto;
    max-width: 900px;
}

.permissions-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
}

.permissions-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
}

.permissions-table th,
.permissions-table td {
    border: 1px solid #d1d5db;
    padding: 12px 16px;
    text-align: center;
}

.permissions-table th {
    background: #f3f4f6;
    font-weight: 600;
}

.permissions-table tbody tr:nth-child(even) {
    background: #f9fafb;
}
</style>
