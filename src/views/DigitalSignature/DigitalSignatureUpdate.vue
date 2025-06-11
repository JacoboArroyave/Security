<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">Actualizar Firma Digital</h2>

      <form @submit.prevent="submitForm" class="form-grid">
        <div class="form-field">
          <label class="form-label">Nueva Firma:</label>

          <input
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="form-input file-input"
            ref="fileInput"
          />

          <div v-if="imagePreview" class="image-preview-container">
            <img :src="imagePreview" alt="Vista previa" class="image-preview" />
            <button type="button" @click="removeImage" class="remove-btn">X</button>
          </div>

          <div v-if="selectedFile" class="file-info">
            <span class="file-name">{{ selectedFile.name }}</span>
            <span class="file-size">({{ formatFileSize(selectedFile.size) }})</span>
          </div>

          <span class="form-error" v-if="errors.photo">{{ errors.photo }}</span>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            :disabled="!selectedFile || isSubmitting"
            class="form-btn"
          >
            {{ isSubmitting ? 'Actualizando...' : 'Actualizar Firma' }}
          </button>
        </div>

        <p v-if="successMessage" class="form-success">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DigitalSignatureService from '../../service/DigitalSignatureService';
import { DigitalSignatureValidator } from '../../utils/DigitalSignatureValidator';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const selectedFile = ref<File | null>(null);
const imagePreview = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');

onMounted(async () => {
  try {
    const res = await DigitalSignatureService.getDigitalSignature(id);
    imagePreview.value = res.data.photo; 
  } catch (err) {
    console.error('Error al obtener firma:', err);
  }
});

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const validation = DigitalSignatureValidator.validateField('photo', file);
  if (!validation.success) {
    errors.photo = validation.error.errors[0].message;
    return;
  }

  delete errors.photo;
  selectedFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  selectedFile.value = null;
  imagePreview.value = '';
  if (fileInput.value) fileInput.value.value = '';
  delete errors.photo;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const submitForm = async () => {
  if (!selectedFile.value) {
    errors.photo = 'Debe seleccionar una imagen';
    return;
  }

  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append('photo', selectedFile.value);

    await DigitalSignatureService.updateDigitalSignature(id, formData);
    successMessage.value = 'Firma actualizada correctamente';

    setTimeout(() => {
      router.push('/signatures');
    }, 1500);
  } catch (err) {
    console.error('Error al actualizar firma:', err);
    successMessage.value = 'Error al actualizar la firma';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.form-container {
  min-height: 100vh;
  background: #f3f4f6;
  padding: 24px;
}

.form-card {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 32px;
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 24px;
  text-align: center;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}

.form-input:focus {
  border-color: #2563eb;
}

.file-input {
  padding: 8px;
  cursor: pointer;
}

.image-preview-container {
  margin-top: 12px;
  position: relative;
  display: inline-block;
}

.image-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: #dc2626;
}

.file-info {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.file-name {
  font-weight: 500;
  color: #374151;
}

.file-size {
  color: #6b7280;
  font-size: 0.9rem;
  margin-left: 8px;
}

.form-error {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 4px;
  font-weight: 500;
}

.form-actions {
  margin-top: 12px;
}

.form-btn {
  width: 100%;
  background: #2563eb;
  color: #fff;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.form-btn:hover:enabled {
  background: #1d4ed8;
}

.form-btn:disabled {
  background: #a1a1aa;
  cursor: not-allowed;
}

.form-success {
  color: #16a34a;
  font-weight: 500;
  text-align: center;
  margin-top: 12px;
  padding: 8px;
  background: #f0fdf4;
  border-radius: 6px;
  border: 1px solid #bbf7d0;
}
</style>
