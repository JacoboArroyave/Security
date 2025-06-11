<template>
  <Form
    :id="id"
    :initial-object="initialSignature"
    :fields="fields"
    :validator="validateSignatureField"
    :service="signatureService"
    title="Editar Firma Digital"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Form from '../../components/Utils/Form.vue';
import { DigitalSignatureValidator } from '../../utils/DigitalSignatureValidator';
import DigitalSignatureService from '../../service/DigitalSignatureService';
import UserService from '../../service/UserService';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const initialSignature = ref({
  photo: '',
});

const users = ref<any[]>([]);
const fields = ref([
 
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
  
  // Cargar firma existente
  const res = await DigitalSignatureService.getDigitalSignature(id);
  initialSignature.value = {
    photo: res.data.photo,
  };
});

const validateSignatureField = (field: string, value: any) => {
  try {
    if (field === 'photo') {
      return DigitalSignatureValidator.validateField('photo', value);
    }
   
    return { success: true, error: { errors: [] } };
  } catch (error) {
    return {
      success: false,
     
    };
  }
};

const signatureService = {
  update: async (id: number | string, signature: any) => {
    const formData = new FormData();
    formData.append('photo', signature.file);
      return await DigitalSignatureService.updateDigitalSignature(Number(id), formData);
  },
  get: async (id: number | string) => {
    return await DigitalSignatureService.getDigitalSignature(Number(id));
  }
};
</script>
