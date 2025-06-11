<template>
  <div>
    <div v-if="loading" class="text-center p-4">
      <p>Cargando pregunta de seguridad...</p>
    </div>

    <div v-else-if="error" class="text-red-500 p-4">
      <p>{{ error }}</p>
      <button @click="$router.back()" class="mt-2 px-4 py-2 bg-gray-500 text-white rounded">
        Volver
      </button>
    </div>

    <Form
      v-else
      :id="questionId"
      :initial-object="initialQuestion"
      :fields="fields"
      :validator="validateField"
      :service="questionService"
      :title="`Editar Pregunta de Seguridad #${questionId}`"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from '../../components/Utils/Form.vue';
import { SecurityQuestionValidator } from '../../utils/SecurityQuestionValidator';
import SecurityQuestionService from '../../service/SecurityQuestionService';
import type { SecurityQuestion } from '../../models/SecurityQuestion';

const route = useRoute();
const router = useRouter();
const questionId = Number(route.params.id);

const loading = ref(true);
const error = ref<string>('');
const users = ref<any[]>([]);

const initialQuestion = ref<any>({
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
    loading.value = true;

    const userRes = await import('../../service/UserService');
    const UserService = userRes.default || userRes;
    const userResponse = await UserService.getUsers();
    users.value = userResponse.data;

    // Cargar pregunta de seguridad por ID
    const response = await SecurityQuestionService.getSecurityQuestion(questionId);
    const questionData = response.data;

    initialQuestion.value = {
      name: questionData.name,
      description: questionData.description,
      user_id: questionData.user?.id || '' // Asumimos que viene como user: { id, name }
    };

    // Inyectar opciones al campo user_id
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
  } catch (err: any) {
    console.error('Error cargando datos:', err);
    error.value = err.message || 'Error al cargar los datos.';
  } finally {
    loading.value = false;
  }
});

const validateField = (field: string, value: any) => {
  try {
    return SecurityQuestionValidator.validateField(field, value);
  } catch {
    return {
      success: false,
      error: {
        errors: [{ message: 'Error de validación' }]
      }
    };
  }
};

const questionService = {
  create: async () => {},
  get: async (id: number | string) => {
    return await SecurityQuestionService.getSecurityQuestion(Number(id));
  },
  update: async (id: number | string, question: any) => {
    const updatedData = {
      name: question.name,
      description: question.description
    };
    return await SecurityQuestionService.updateSecurityQuestion(Number(id), updatedData, question.user_id);
  }
};
</script>
