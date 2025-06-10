<template>
  <Form
    :initial-object="initialSignature"
    :fields="fields"
    :validator="(field, value) => DigitalSignatureValidator.validateField(field, value)"
    :service="signatureService"
    title="Crear Firma Digital"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { DigitalSignatureValidator } from '../../utils/DigitalSignatureValidator';
import DigitalSignatureService from '../../service/DigitalSignatureService';
import type { DigitalSignature } from '../../models/DigitalSignature';

const initialSignature = {
  photo: ''
};

const fields = [
  { key: 'photo', label: 'URL de la Foto', type: 'text' }
];

const signatureService = {
  create: (signature: DigitalSignature) => DigitalSignatureService.createDigitalSignature(signature),
  get: (id: number | string) => DigitalSignatureService.getDigitalSignature(Number(id)),
  update: (id: number | string, signature: DigitalSignature) => DigitalSignatureService.updateDigitalSignature(Number(id), signature)
};
</script>
