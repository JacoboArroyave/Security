<template>
    <div class="list-container">
        <div class="list-card">
            <h1 class="list-title">{{ title }}</h1>

            <router-link :to="createLink" class="list-create-btn">
                <PlusCircleIcon class="icon" />
                {{ createLabel }}
            </router-link>

            <div class="list-table-wrapper">
                <table class="list-table">
                    <thead class="list-thead">
                        <tr>
                            <th v-for="header in headers" :key="header" class="list-th">{{ header }}</th>
                            <th class="list-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id" class="list-tr">
                            <td v-for="field in fields" :key="field" class="list-td">{{ item[field] }}</td>
                            <td class="list-td list-actions">
                                <template v-for="(action) in actions" :key="action.id">
                                    <component
                                        :is="action.component"
                                        v-bind="action.getProps(item)"
                                        class="action-btn"
                                    >
                                        <template v-if="action.slot" #default>
                                            {{ action.slot(item) }}
                                        </template>
                                    </component>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon } from 'lucide-vue-next';
import { defineProps } from 'vue';

defineProps<{
    title: string,
    headers: string[],
    fields: string[],
    items: any[],
    createLink: string,
    createLabel: string,
    updateLink: (id: number | string) => string,
    onDelete: (id: number | string) => void,
    actions: Array<{
        component: any,
        getProps: (item: any) => Record<string, any>,
        slot?: (item: any) => string
    }>
}>();
</script>

<style scoped>
.list-container {
    min-height: 100vh;
    background: #f3f4f6;
    padding: 24px;
}
.list-card {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-radius: 12px;
    padding: 24px;
}
.list-title {
    font-size: 2rem;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 16px;
}
.list-create-btn {
    display: inline-flex;
    align-items: center;
    background: #2563eb;
    color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    text-decoration: none;
    margin-bottom: 16px;
    transition: background 0.2s;
}
.list-create-btn:hover {
    background: #1d4ed8;
}
.icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}
.list-table-wrapper {
    overflow-x: auto;
}
.list-table {
    width: 100%;
    background: #fff;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
}
.list-thead {
    background: #e5e7eb;
    color: #374151;
}
.list-th, .list-td {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    text-align: left;
}
.list-tr:hover {
    background: #f9fafb;
    transition: background 0.2s;
}
.action-btn {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 500;
    border: none;
    background: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    text-decoration: none;
}
.action-btn:hover {
    background: #e0e7ef;
    color: #2563eb;
    box-shadow: 0 2px 8px rgba(59,130,246,0.08);
}
.action-btn.router-link-active {
    color: #2563eb;
    text-decoration: underline;
}
.list-actions {
    display: flex;
    gap: 8px;
    align-items: center;
}
.list-td {
    vertical-align: middle;
}
</style>