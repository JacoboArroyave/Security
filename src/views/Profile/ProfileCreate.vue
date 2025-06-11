<template>
<Form
  :initial-object="initialProfile"
  :fields="fields"
  :service="profileService"
  title="Crear Perfil"
/>

</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { ref, onMounted } from 'vue';
import ProfileService from '../../service/ProfileService';
import UserService from '../../service/UserService';
// import { ProfileValidator } from '../../../src/utils/ProfileValidator';

const users = ref<any[]>([]);

const initialProfile = {
  phone: '',
  photo: null,
  user_id: ''
};

const fields = ref([
  { key: 'phone', label: 'Teléfono', type: 'text' },
  { key: 'photo', label: 'Foto', type: 'file' },
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
    // const parsed = ProfileValidator.safeParse(profile);

    const formData = new FormData();
    formData.append('phone', profile.phone);
    if (profile.photo) {
      formData.append('photo', profile.photo);
    }

    return ProfileService.createProfile(profile.user_id, formData);
  }
};
</script>
