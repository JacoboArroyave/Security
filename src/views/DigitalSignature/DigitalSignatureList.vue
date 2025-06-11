<template>
  <List
    title="Lista de Firmas Digitales"
    :headers="['ID', 'Foto']"
    :fields="['id', 'photo']"
    :items="signatures"
    createLink="/signatures/create"
    createLabel="Crear Firma Digital"
    :actions="actions"
  >
    <template #field-photo="{ item }">
      <img
        :src="item.photo"
        alt="Firma Digital"
        class="w-20 h-20 object-contain border rounded"
      />
    </template>
  </List>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import List from '../../components/Utils/List.vue';
import DigitalSignatureService from '../../service/DigitalSignatureService.ts';
import type { DigitalSignature } from '../../models/DigitalSignature';

const signatures = ref<DigitalSignature[]>([]);

const fetchSignatures = async () => {
  try {
    const res = await DigitalSignatureService.getAllDigitalSignatures();
    signatures.value = res.data;
  } catch (error) {
    console.error('Error al obtener firmas digitales:', error);
  }
};

const deleteSignature = async (id: number) => {
  try {
    await DigitalSignatureService.deleteDigitalSignature(id);
    await fetchSignatures();
  } catch (error) {
    console.error('Error al eliminar firma digital:', error);
  }
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: DigitalSignature) => ({
      to: `/signatures/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: DigitalSignature) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => {
        if (confirm('¿Estás seguro de eliminar esta firma digital?')) {
          deleteSignature(item.id);
        }
      }
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchSignatures);
</script>
