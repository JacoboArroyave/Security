<template>
  <Form
    v-if="initialProfile"
    :initial-object="initialProfile"
    :fields="fields"
    :validator="validateProfileField"
    :service="profileService"
    title="Editar Perfil"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from '../../components/Utils/Form.vue';
import ProfileService from '../../service/ProfileService';
import UserService from '../../service/UserService';
import { ProfileValidator } from '../../utils/ProfileValidator';

const route = useRoute();
const router = useRouter();
const profileId = route.params.id as string;

const users = ref<any[]>([]);
const initialProfile = ref<any | null>(null);

const fields = ref([
  { key: 'phone', label: 'Teléfono', type: 'text' },
  { key: 'photo', label: 'Foto del perfil', type: 'file', accept: 'image/*' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

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

onMounted(async () => {
  const resUsers = await UserService.getUsers();
  users.value = resUsers.data;
  fields.value = fields.value.map(f =>
    f.key === 'user_id'
      ? { ...f, options: users.value.map((u: any) => ({ label: u.name, value: u.id })) }
      : f
  );

  const resProfile = await ProfileService.getProfile(profileId);
  initialProfile.value = {
    phone: resProfile.data.phone,
    photo: null, // no se previsualiza archivo; es opcional cambiarlo
    user_id: resProfile.data.user_id
  };
});

const profileService = {
  create: async (profile: any) => {
    const formData = new FormData();
    formData.append('phone', profile.phone);
    formData.append('user_id', profile.user_id);
    if (profile.photo instanceof File) {
      formData.append('photo', profile.photo);
    }
    return await ProfileService.updateProfile(profileId, formData);
  }
};
</script>
