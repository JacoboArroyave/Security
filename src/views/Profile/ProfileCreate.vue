<template>
  <Form
    :initial-object="initialProfile"
    :fields="fields"
    :validator="validateProfileField"
    :service="profileService"
    title="Crear Perfil"
  />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import ProfileService from '../../service/ProfileService';
import UserService from '../../service/UserService';
import { ProfileValidator } from '../../utils/ProfileValidator';
import { ref, onMounted } from 'vue';

const validateProfileField = (field: string, value: any) => {
  try {
    return ProfileValidator.validateField(field as any, value);
  } catch (error) {
    return {
      success: false,
      error: {
        errors: [{ message: 'Error de validación inesperado' }]
      }
    };
  }
};

const users = ref<any[]>([]);
const initialProfile = {
  phone: '',
  photo: null,
  user_id: ''
};

const fields = ref([
  { key: 'phone', label: 'Teléfono', type: 'text' },
  { key: 'photo', label: 'Foto del perfil', type: 'file', accept: 'image/*' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

onMounted(async () => {
  const res = await UserService.getUsers();
  users.value = res.data;
  fields.value = fields.value.map(f =>
    f.key === 'user_id'
      ? { ...f, options: users.value.map((u: any) => ({ label: u.name, value: u.id })) }
      : f
  );
});

const profileService = {
  create: async (profile: any) => {
    console.log('[profileService.create] profile:', profile);
    const formData = new FormData();
    formData.append('photo', profile.file);
    formData.append('phone', profile.phone);
    
   
    return await ProfileService.createProfile(profile.user_id, formData);
  }
};
</script>
