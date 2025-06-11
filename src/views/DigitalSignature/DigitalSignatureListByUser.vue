<template>
  <div class="digital-signature-user-container">
    <div class="digital-signature-card">
      <h2 class="digital-signature-title">Firmas Digitales del Usuario</h2>
      <div class="digital-signature-user-info">
        <div><strong>Nombre:</strong> {{ user?.name }}</div>
        <div><strong>Email:</strong> {{ user?.email }}</div>
      </div>
      <div class="digital-signature-list">
        <div v-for="signature in signatures" :key="signature.id" class="digital-signature-item">
          <div class="digital-signature-photo">
            <img v-if="signature.photo" :src="`http://localhost:5000/api/${signature.photo}`" alt="Firma Digital" class="digital-signature-img" />
            <div v-else class="digital-signature-img-placeholder"></div>
          </div>
          <div class="digital-signature-info">
            <div><strong>ID:</strong> {{ signature.id }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DigitalSignatureService from '../../service/DigitalSignatureService';
import UserService from '../../service/UserService';

const route = useRoute();
const userId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const signatures = ref<any[]>([]);
const user = ref<any>(null);

onMounted(async () => {
  if (!userId) return;
  const res = await DigitalSignatureService.getSignaturesByUserId(String(userId));
  signatures.value = Array.isArray(res.data) ? res.data : [res.data];
  // Obtener datos del usuario
  const userRes = await UserService.getUser(Number(userId));
  user.value = userRes.data;
});
</script>

<style scoped>
.digital-signature-user-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  background: #f3f4f6;
  padding: 32px 0;
}
.digital-signature-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 32px 40px;
  min-width: 350px;
  max-width: 420px;
}
.digital-signature-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
}
.digital-signature-user-info {
  font-size: 1.1rem;
  color: #222;
  margin-bottom: 24px;
}
.digital-signature-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.digital-signature-item {
  display: flex;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
}
.digital-signature-photo {
  margin-bottom: 0;
}
.digital-signature-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background: #f3f4f6;
}
.digital-signature-img-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 8px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.digital-signature-info {
  font-size: 1.1rem;
  color: #222;
  text-align: left;
  width: 100%;
}
.digital-signature-info > div {
  margin-bottom: 10px;
}
</style>
