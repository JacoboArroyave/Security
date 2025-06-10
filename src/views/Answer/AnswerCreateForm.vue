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
  content: '',
  user_id: '',
  security_question_id: ''
};

const fields = [
  { key: 'content', label: 'Respuesta', type: 'text' },
  { key: 'user_id', label: 'ID de Usuario', type: 'number' },
  { key: 'security_question_id', label: 'ID de Pregunta de Seguridad', type: 'number' }
];

const answerService = {
  create: (answer: Answer) => {
    // Solo enviar el content en el body, user_id y security_question_id como argumentos
    return AnswerService.createAnswer(answer.user_id, answer.security_question_id, { content: answer.content });
  },
  get: (id: number | string) => AnswerService.getAnswer(Number(id)),
  update: (id: number | string, answer: Answer) => AnswerService.updateAnswer(Number(id), answer)
};
</script>
