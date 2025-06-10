<template>
  <List
    title="Lista de Preguntas de Seguridad"
    :headers="['Nombre', 'Descripción']"
    :fields="['name', 'description']"
    :items="questions"
    createLink="/security-questions/create"
    createLabel="Crear Pregunta de Seguridad"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import List from '../../components/Utils/List.vue';
import SecurityQuestionService from '../../service/SecurityQuestionService.ts';
import type { SecurityQuestion } from '../../models/SecurityQuestion';

const questions = ref<SecurityQuestion[]>([]);

const fetchQuestions = async () => {
  try {
    const res = await SecurityQuestionService.getSecurityQuestions();
    questions.value = res.data;
  } catch (error) {
    console.error('Error al obtener preguntas de seguridad:', error);
  }
};

const deleteQuestion = async (id: number) => {
  try {
    await SecurityQuestionService.deleteSecurityQuestion(id);
    await fetchQuestions();
  } catch (error) {
    console.error('Error al eliminar pregunta:', error);
  }
};

const actions = [
  {
    component: 'router-link',
    getProps: (item: SecurityQuestion) => ({
      to: `/security-questions/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: SecurityQuestion) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => {
        if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
          deleteQuestion(item.id);
        }
      }
    }),
    slot: () => 'Eliminar'
  }
];

onMounted(fetchQuestions);
</script>
