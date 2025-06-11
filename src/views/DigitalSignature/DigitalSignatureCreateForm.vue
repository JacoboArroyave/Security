<template>
  <Form :initial-object="initialSignature" :fields="fields" :validator="validateSignatureField"
    :service="signatureService" title="Crear Firma Digital" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Form from '../../components/Utils/Form.vue';
import { DigitalSignatureValidator } from '../../utils/DigitalSignatureValidator';
import DigitalSignatureService from '../../service/DigitalSignatureService';
import UserService from '../../service/UserService';

const initialSignature = {
  photo: '',
  user_id: ''
};

const users = ref<any[]>([]);
const fields = ref([
  {
    key: 'user_id',
    label: 'Usuario',
    type: 'select',
    options: []
  },
  { 
    key: 'photo',
    label: 'Foto de la Firma',
    type: 'file',
    accept: 'image/*'
  }
]);

onMounted(async () => {
  const userResponse = await UserService.getUsers();
  users.value = userResponse.data;
  fields.value = fields.value.map(field => {
    if (field.key === 'user_id') {
      return {
        ...field,
        options: users.value.map((user: any) => ({ label: user.name, value: user.id }))
      };
    }
    return field;
  });
});

const validateSignatureField = (field: string, value: any) => {
  try {
    // Solo validar si el campo existe en el schema
    if (field === 'photo') {
      return DigitalSignatureValidator.validateField('photo', value);
    }
    // Para user_id, validación simple
    if (field === 'user_id') {
      return {
        success: !!value,
        error: {
          errors: value ? [] : [{ message: 'Seleccione un usuario' }]
        }
      };
    }
    return { success: true, error: { errors: [] } };
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
    console.log(signature.file);
    const formData = new FormData();
    formData.append('photo', signature.file);
    console.log(formData.keys());
    
    return await DigitalSignatureService.createDigitalSignature(formData,signature.user_id);
  }
};
</script>
