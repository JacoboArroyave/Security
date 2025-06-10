<template>
  <List
    title="Lista de Respuestas"
    :headers="['ID', 'Contenido']"
    :fields="['id', 'content']"
    :items="answers"
    createLink="/answers/create"
    createLabel="Crear Respuesta"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import AnswerService from '../../service/AnswerService.ts';
import type { Answer } from '../../models/Answer';

const answers = ref<Answer[]>([]);

const fetchAnswers = async () => {
  try {
    const res = await AnswerService.getAnswers();
    answers.value = res.data;
  } catch (error) {
    console.error('Error al obtener respuestas:', error);
  }
};

const deleteAnswer = async (id: number) => {
  try {
    await AnswerService.deleteAnswer(id);
    await fetchAnswers();
  } catch (error) {
    console.error('Error al eliminar respuesta:', error);
  }
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: Answer) => ({
      to: `/answers/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: Answer) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => {
        if (confirm('¿Estás seguro de eliminar esta respuesta?')) {
          deleteAnswer(item.id);
        }
      }
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchAnswers);
</script>
