<template>
  <Form
    :initial-object="initialAnswer"
    :fields="fields"
    :validator="(field, value) => AnswerValidator.validateField(field, value)"
    :service="answerService"
    title="Crear Respuesta"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { AnswerValidator } from '../../utils/AnswerValidator';
import AnswerService from '../../service/AnswerService';
import { ref, onMounted } from 'vue';

const initialAnswer = {
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

    const questionRes = await import('../../service/SecurityQuestionService');
    const SecurityQuestionService = questionRes.default || questionRes;
    const questionResponse = await SecurityQuestionService.getSecurityQuestions();
    securityQuestions.value = questionResponse.data;

    fields.value = fields.value.map(field => {
      
      if (field.key === 'security_question_id') {
        securityQuestions.value.forEach((question: any) => {console.log('Pregunta de seguridad:', question);});
        
        return {
          ...field,
          options: securityQuestions.value.map((question: any) => ({
            label: question.name,
            value: question.id
          }))
        };
      }
      if (field.key === 'user_id') {

        return {
          ...field,
          options: users.value.map((user: any) => ({
            label: user.name,
            value: user.id
          }))
        };
      }
      
      return field;
    });
    console.log(fields.value);
    
  } catch (error) {
    // Puedes mostrar un mensaje de error si lo deseas
    console.error('Error cargando datos:', error);
  }
});

const answerService = {
  create: (answer: any) => {
    return AnswerService.createAnswer(
      answer.user_id,
      answer.security_question_id,
      { content: answer.content }
    );
  },
  get: (id: number | string) => AnswerService.getAnswer(Number(id)),
  update: (id: number | string, answer: any) => AnswerService.updateAnswer(Number(id), answer)
};
</script>
