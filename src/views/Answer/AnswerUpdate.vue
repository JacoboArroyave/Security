<template>
  <Form :initial-object="initialAnswer" :fields="fields"
    :validator="(field, value) => AnswerValidator.validateField(field, value)" :service="answerService"
    title="Actualizar Respuesta" :id="answerId" />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { AnswerValidator } from '../../utils/AnswerValidator';
import AnswerService from '../../service/AnswerService';
import type { Answer } from '../../models/Answer';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const answerId = Number(route.params.id);

let initialAnswer = {
  content: '',
  user_id: '',
  security_question_id: ''
};

const users = ref<any[]>([]);
const securityQuestions = ref<any[]>([]);

const fields = ref([
  { key: 'content', label: 'Respuesta', type: 'text' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] },
  { key: 'security_question_id', label: 'Pregunta de Seguridad', type: 'select', options: [] }
]);

onMounted(async () => {
  try {
    const userRes = await import('../../service/UserService');
    const UserService = userRes.default || userRes;
    const userResponse = await UserService.getUsers();
    users.value = userResponse.data;

    // Cargar preguntas de seguridad
    const questionRes = await import('../../service/SecurityQuestionService');
    const SecurityQuestionService = questionRes.default || questionRes;
    const questionResponse = await SecurityQuestionService.getSecurityQuestions();
    securityQuestions.value = questionResponse.data;

    fields.value = fields.value.map(field => {
      if (field.key === 'user_id') {
        return {
          ...field,
          options: users.value.map((user: any) => ({
            label: user.name,
            value: user.id
          }))
        };
      }
      if (field.key === 'security_question_id') {
        return {
          ...field,
          options: securityQuestions.value.map((question: any) => ({
            label: question.question,
            value: question.id
          }))
        };
      }
      return field;
    });
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
});

const answerService = {
  update: (id: number | string, answer: Answer) => AnswerService.updateAnswer(Number(id), answer),
  get: (id: number | string) => AnswerService.getAnswer(Number(id))
};
</script>