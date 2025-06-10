<template>
  <List
    :title="'Lista de Perfiles'"
    :headers="['Teléfono', 'Foto']"
    :fields="['phone', 'photo']"
    :items="profiles"
    :createLink="'profiles-create'"
    :createLabel="'Crear Perfil'"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import ProfileService from '../../service/ProfileService';
import type { Profile } from '../../models/Profile';

const profiles = ref<Profile[]>([]);

const fetchProfiles = async () => {
  const res = await ProfileService.getProfiles();
  profiles.value = res.data;
};

const deleteProfile = async (id: string) => {
  await ProfileService.deleteProfile(id);
  fetchProfiles();
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: any) => ({
      to: `/profiles-update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: any) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => deleteProfile(item.id)
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchProfiles);
</script>
