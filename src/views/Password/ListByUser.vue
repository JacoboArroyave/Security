<template>
  <List
    :title="'Contraseñas del Usuario'"
    :headers="headers"
    :fields="fields"
    :items="passwords"
    :onDelete="onDelete"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PasswordServices from '../../service/PasswordServices';

const route = useRoute();
const router = useRouter();
const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const headers = ['ID', 'Contraseña', 'Fecha de Creación', 'Última Actualización'];
const fields = ['id', 'content', 'created_at', 'updated_at'];
const passwords = ref([]);

const createLink = `/password/create?user_id=${userId}`;
const updateLink = (id: number | string) => `/password-update/${id}`;
const onDelete = async (id: number | string) => {
  await PasswordServices.deletePassword(String(id));
  passwords.value = passwords.value.filter((p: any) => p.id !== id);
};

onMounted(async () => {
  if (!userId) return;
  const res = await PasswordServices.getPasswordsByUserId(String(userId));
  console.log(res.data);
  
  passwords.value = res.data;
});
</script>
