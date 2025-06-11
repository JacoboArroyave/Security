<template>
  <SignatureForm
    :initial-object="initialSignature"
    :fields="fields"
    :validator="validateSignatureField"
    :service="signatureService"
    title="Crear Firma Digital"
  />
</template>

<script setup lang="ts">
import SignatureForm from '../../components/Utils/SignatureForm.vue';
import { DigitalSignatureValidator } from '../../utils/DigitalSignatureValidator';
import DigitalSignatureService from '../../service/DigitalSignatureService';
import type { DigitalSignature } from '../../models/DigitalSignature';

const userId = 1; // TODO: reemplazar por el usuario autenticado

const initialSignature: DigitalSignature = {
  photo: null
};

const fields = [
  { 
    key: 'photo', 
    label: 'Foto de la Firma', 
    type: 'file',
    accept: 'image/*'
  }
];

const validateSignatureField = (field: string, value: any) => {
  try {
    return DigitalSignatureValidator.validateField(field, value);
  } catch (error) {
    return {
      success: false,
      error: {
        errors: [{ message: 'Error de validación' }]
      }
    };
  }
};

const signatureService = {
  create: async (signature: any) => {
    const formData = new FormData();
    if (signature.photo instanceof File) {
      formData.append('photo', signature.photo);
    }
    return await DigitalSignatureService.createDigitalSignature(formData, userId);
  },

  get: async (id: number | string) => {
    return await DigitalSignatureService.getDigitalSignature(Number(id));
  },

  update: async (id: number | string, signature: any) => {
    const formData = new FormData();
    if (signature.photo instanceof File) {
      formData.append('photo', signature.photo);
      return await DigitalSignatureService.updateDigitalSignature(Number(id), formData);
    }
    return await DigitalSignatureService.updateDigitalSignature(Number(id), signature);
  },

  delete: async (id: number | string) => {
    return await DigitalSignatureService.deleteDigitalSignature(Number(id));
  }
};
</script>
