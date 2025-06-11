<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const props = defineProps<{
  id?: number | string,
  initialObject: Record<string, any>,
  fields: Array<{ key: string, label: string, type: string, accept?: string, disabled?: boolean, options?: any[] }>,
  validator:  (field: string, value: any) => any,
  service: {
    get?: (id: number | string) => Promise<any>,
    create?: (obj: any) => Promise<any>,
    update?: (id: number | string, obj: any) => Promise<any>
  },
  title?: string
}>();

const formObject = reactive({ ...props.initialObject });
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");
const selectedFileRef = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const selectedFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;
  selectedFileRef.value = file;
  previewUrl.value = file ? URL.createObjectURL(file) : null;
};

const validateField = (field: string) => {
  const result = props.validator(field, formObject[field]);
  if (!result.success) {
    errors[field] = result.error.errors[0].message;
  } else {
    delete errors[field];
  }
};

const validateAllFields = () => {
  props.fields.forEach((f) => validateField(f.key));
};

onMounted(async () => {
  if (props.id && props.service.get) {
    try {
      const fetched = await props.service.get(props.id);
      Object.assign(formObject, fetched.data);
    } catch (error: any) {
      console.error("Error en la operación:", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
      successMessage.value = "Error en la operación.";
    }
  }
});

// Tu submitForm tal como lo compartiste
const submitForm = async () => {
  validateAllFields();
  if (Object.keys(errors).length > 0) return;
  isSubmitting.value = true;
  successMessage.value = "";

  try { 
    if (props.id) {
      console.log(selectedFileRef.value);
      await props.service.update(props.id, { ...formObject, file: selectedFileRef.value });
      successMessage.value = "Actualizado exitosamente.";
    } else {
      await props.service.create({ ...formObject, file: selectedFileRef.value });
      successMessage.value = "Creado exitosamente.";
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    successMessage.value = "Error en la  operación.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">
        {{ title || (props.id ? 'Editar' : 'Crear') }}
      </h2>
      <form @submit.prevent="submitForm" class="form-grid">
        <div v-for="field in fields" :key="field.key" class="form-field">
          <label class="form-label">{{ field.label }}:</label>

          <template v-if="field.type === 'file'">
            <input
              type="file"
              class="form-input"
              :accept="field.accept || '*/*'"
              @change="selectedFile"
              :disabled="field.disabled"
            />
            <img
              v-if="previewUrl"
              :src="previewUrl"
              alt="Vista previa"
              style="max-width: 200px; margin-top: 8px; border-radius: 8px;"
            />
          </template>

          <template v-else-if="field.type === 'select'">
            <select
              v-model="formObject[field.key]"
              @change="validateField(field.key)"
              class="form-input"
              :disabled="field.disabled"
            >
              <option value="">Seleccione...</option>
              <option v-for="option in (field.options || [])" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </template>

          <template v-else-if="field.type === 'date' || field.type === 'datetime-local'">
            <input
              v-model="formObject[field.key]"
              :type="field.type"
              @blur="validateField(field.key)"
              class="form-input"
              :disabled="field.disabled"
            />
          </template>

          <template v-else>
            <input
              v-model="formObject[field.key]"
              :type="field.type"
              @input="validateField(field.key)"
              @blur="validateField(field.key)"
              class="form-input"
              :disabled="field.disabled"
            />
          </template>

          <span class="form-error" v-if="errors[field.key]">{{ errors[field.key] }}</span>
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting" class="form-btn">
            {{ isSubmitting ? "Enviando..." : (props.id ? "Actualizar" : "Crear") }}
          </button>
        </div>

        <p v-if="successMessage" class="form-success">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

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
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
  margin-bottom: 6px;
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
.form-error {
  color: #ef4444;
  font-size: 0.95rem;
  margin-top: 2px;
}
.form-actions {
  margin-top: 12px;
}
.form-btn {
  width: 100%;
  background: #2563eb;
  color: #fff;
  padding: 10px 0;
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
  margin-top: 10px;
}
</style>
