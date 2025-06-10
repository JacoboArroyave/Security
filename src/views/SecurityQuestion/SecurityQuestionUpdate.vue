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
            :initial-object="initialQuestion"
            :fields="fields"
            :validator="(field, value) => SecurityQuestionValidator.validateField(field, value)"
            :service="questionService"
            :title="`Actualizar Pregunta de Seguridad #${questionId}`"
            mode="update"
            :entity-id="questionId"
            :key="`update-${questionId}`"
            @success="handleUpdateSuccess"
            @error="handleUpdateError"
        />
    </div>
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { SecurityQuestionValidator } from '../../utils/SecurityQuestionValidator';
import SecurityQuestionService from '../../service/SecurityQuestionService';
import type { SecurityQuestion } from '../../models/SecurityQuestion';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const questionId = ref<number>(Number(route.params.id));
const loading = ref(true);
const error = ref<string>('');

const initialQuestion = ref<SecurityQuestion>({
    id: undefined,
    name: '',
    description: ''
});

const fields = [
    { key: 'name', label: 'Nombre', type: 'text', required: true },
    { key: 'description', label: 'Descripción', type: 'text', required: true }
];

const questionService = {
    create: (question: SecurityQuestion) => SecurityQuestionService.createSecurityQuestion(question),
    get: (id: number | string) => SecurityQuestionService.getSecurityQuestion(Number(id)),
    update: (id: number | string, question: SecurityQuestion) => {
        console.log('ACTUALIZANDO pregunta existente con ID:', id);

        const updatedData = {
            name: question.name,
            description: question.description
        };

        console.log('URL usada:', `${import.meta.env.VITE_API_URL}/api/security-questions/${id}`);
        console.log('Datos enviados:', updatedData);

        return SecurityQuestionService.updateSecurityQuestion(Number(id), updatedData);
    }
};

onMounted(async () => {
    try {
        loading.value = true;

        if (!questionId.value || isNaN(questionId.value)) {
            throw new Error('ID de pregunta de seguridad inválido');
        }

        console.log('Cargando pregunta con ID:', questionId.value);
        const response = await SecurityQuestionService.getSecurityQuestion(questionId.value);

        if (response && response.data) {
            initialQuestion.value = {
                id: response.data.id,
                name: response.data.name || '',
                description: response.data.description || ''
            };
            console.log('Pregunta cargada para actualización:', initialQuestion.value);
        } else {
            throw new Error('No se pudo cargar la pregunta de seguridad');
        }
    } catch (err: any) {
        console.error('Error cargando pregunta de seguridad:', err);
        error.value = err.message || 'Error desconocido al cargar la pregunta de seguridad';
    } finally {
        loading.value = false;
    }
});

const handleUpdateSuccess = (result: any) => {
    console.log('Actualización exitosa:', result);
    alert('Pregunta de seguridad actualizada correctamente');
    router.push('/security-questions');
};

const handleUpdateError = (err: any) => {
    console.error('Error en actualización:', err);
    alert('Error al actualizar la pregunta de seguridad');
};
</script>
