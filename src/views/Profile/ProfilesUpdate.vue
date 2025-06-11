<template>
  <Form
    :id="id"
    :initialObject="initialProfile"
    :fields="fields"
    :validator="validateProfileField"
    :service="profileService"
    title="Editar Perfil"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Form from '../../components/Utils/Form.vue';
import { ProfileValidator } from '../../utils/ProfileValidator';
import ProfileService from '../../service/ProfileService';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const initialProfile = ref({
  phone: '',
  photo: ''
});

const fields = ref([
  { key: 'phone', label: 'Teléfono', type: 'text' },
  { key: 'photo', label: 'Foto del Perfil', type: 'file', accept: 'image/*' }
]);


onMounted(async () => {
  // Cargar perfil existente
  const res = await ProfileService.getProfile(id);
  console.log(res);
  initialProfile.value = {
    phone: res.data.phone || '',
    photo: res.data.photo || ''
  };

});

const validateProfileField = (field: string, value: any) => {
  try {
    return ProfileValidator.validateField(field, value);
  } catch (error) {
    return {
      success: false,
      error: { errors: [{ message: 'Error de validación inesperado' }] }
    };
  }
};

const profileService = {
  update: async (id: number | string, profile: any) => {
    const formData = new FormData();
    if (profile.file) {
      formData.append('photo', profile.file);
    }
    if (profile.phone) {
      formData.append('phone', profile.phone);
    }
    return await ProfileService.updateProfile(Number(id), formData);
  },
  get: async (id: number | string) => {
    return await ProfileService.getProfile(Number(id));
  }
};
</script>
