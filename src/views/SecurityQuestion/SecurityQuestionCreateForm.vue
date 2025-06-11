<template>
  <Form
    :initial-object="initialQuestion"
    :fields="fields"
    :validator="validateField"
    :service="questionService"
    title="Crear Pregunta de Seguridad"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Form from '../../components/Utils/Form.vue';
import { SecurityQuestionValidator } from '../../utils/SecurityQuestionValidator';
import SecurityQuestionService from '../../service/SecurityQuestionService';
import type { SecurityQuestion } from '../../models/SecurityQuestion';

const users = ref<any[]>([]);

const initialQuestion = ref({
  name: '',
  description: '',
  user_id: ''
});

const fields = ref([
  { key: 'name', label: 'Nombre', type: 'text' },
  { key: 'description', label: 'Descripción', type: 'text' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

onMounted(async () => {
  try {
    const userRes = await import('../../service/UserService');
    const UserService = userRes.default || userRes;
    const userResponse = await UserService.getUsers(); // Asegúrate de tener este método
    users.value = userResponse.data;

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
      return field;
    });
  } catch (error) {
    console.error('Error cargando usuarios:', error);
  }
});

const validateField = (field: string, value: any) => {
  try {
    return SecurityQuestionValidator.validateField(field, value);
  } catch (error) {
    return {
      success: false,
      error: {
        errors: [{ message: 'Error de validación' }]
      }
    };
  }
};

const questionService = {
  create: async (question: any) => {
    try {
      return await SecurityQuestionService.createSecurityQuestion(
        {
          name: question.name,
          description: question.description
        },
        question.user_id
      );
    } catch (error) {
      console.error('Error al crear la pregunta de seguridad:', error);
      throw error;
    }
  },
  get: async (id: number | string) => {
    return await SecurityQuestionService.getSecurityQuestion(Number(id));
  },
  update: async (id: number | string, question: SecurityQuestion) => {
    return await SecurityQuestionService.updateSecurityQuestion(Number(id), question);
  }
};
</script>
