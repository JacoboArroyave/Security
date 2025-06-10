<template>
  <Form
    :initial-object="initialQuestion"
    :fields="fields"
    :validator="(field, value) => SecurityQuestionValidator.validateField(field, value)"
    :service="questionService"
    title="Crear Pregunta de Seguridad"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { SecurityQuestionValidator } from '../../utils/SecurityQuestionValidator.ts';
import SecurityQuestionService from '../../service/SecurityQuestionService';
import type { SecurityQuestion } from '../../models/SecurityQuestion';

const initialQuestion = {
  name: '',
  description: ''
};

const fields = [
  { key: 'name', label: 'Nombre', type: 'text' },
  { key: 'description', label: 'Descripción', type: 'text' }
];

const questionService = {
  create: (question: SecurityQuestion) => SecurityQuestionService.createSecurityQuestion(question),
  get: (id: number | string) => SecurityQuestionService.getSecurityQuestion(Number(id)),
  update: (id: number | string, question: SecurityQuestion) => SecurityQuestionService.updateSecurityQuestion(Number(id), question)
};
</script>
