<template>
  <div class="profile-user-container">
    <div class="profile-card">
      <h2 class="profile-title">{{ profile?.name }} - Profile</h2>
      <div class="profile-content">
        <div class="profile-photo">
          <img v-if="profile?.photo" :src="profile.photo" alt="Foto de perfil" class="profile-img" />
          <div v-else class="profile-img-placeholder"></div>
        </div>
        <div class="profile-info">
          <div><strong>Name:</strong> {{ profile?.name }}</div>
          <div><strong>Email:</strong> {{ profile?.email }}</div>
          <div><strong>Phone:</strong> {{ profile?.phone }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProfileService from '../../service/ProfileService';
import UserService from '../../service/UserService';

const route = useRoute();
const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const profile = ref<any>(null);

onMounted(async () => {
  if (!userId) return;
  // Obtener perfil
  const res = await ProfileService.getProfilesByUserId(String(userId));
  const profileData = Array.isArray(res.data) ? res.data[0] : res.data;
  // Obtener datos de usuario
  const userRes = await UserService.getUser(Number(userId));
  console.log(`http://localhost:5000/api/profiles/${profileData.photo}`);
  
  profile.value = {
    ...profileData,
    name: userRes.data.name,
    email: userRes.data.email,
    photo: `http://localhost:5000/api/${profileData.photo}`
  };
});
</script>

<style scoped>
.profile-user-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  background: #f3f4f6;
  padding: 32px 0;
}
.profile-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 32px 40px;
  min-width: 350px;
  max-width: 420px;
}
.profile-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
}
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-photo {
  margin-bottom: 18px;
}
.profile-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background: #f3f4f6;
}
.profile-img-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 8px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-info {
  font-size: 1.1rem;
  color: #222;
  text-align: left;
  width: 100%;
}
.profile-info > div {
  margin-bottom: 10px;
}
</style>
