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
import { AnswerValidator } from '../../utils/AnswerValidator.ts';
import AnswerService from '../../service/AnswerService';
import type { Answer } from '../../models/Answer';

const initialAnswer = {
  response: '',
  user_id: '',
  security_question_id: ''
};

const fields = [
  { key: 'response', label: 'Respuesta', type: 'text' },
  { key: 'user_id', label: 'ID de Usuario', type: 'number' },
  { key: 'security_question_id', label: 'ID de Pregunta de Seguridad', type: 'number' }
];

const answerService = {
  create: (answer: Answer) => AnswerService.createAnswer(answer),
  get: (id: number | string) => AnswerService.getAnswer(Number(id)),
  update: (id: number | string, answer: Answer) => AnswerService.updateAnswer(Number(id), answer)
};
</script>
