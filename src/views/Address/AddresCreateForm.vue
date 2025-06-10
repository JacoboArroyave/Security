<template>
  <div>
    <Form
      :initial-object="initialAddress"
      :fields="fields"
      :validator="(field, value) => AddressValidator.validateField(field, value)"
      :service="addressService"
      title="Crear Dirección"
    />

    <MapPicker
      :lat="defaultMapLocation.lat"
      :lng="defaultMapLocation.lng"
      :zoom="13"
      @update:location="updateMapLocation"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Form from '../../components/Utils/Form.vue';
import MapPicker from '../../components/Utils/MapPicker.vue';
import { AddressValidator } from '../../utils/AddressValidator';
import AddressService from '../../service/ServicesAddress';

const defaultMapLocation = { lat: 5.07, lng: -75.52 };

// Coordenadas seleccionadas en el mapa (se usarán al enviar)
const selectedMapLocation = ref({ lat: defaultMapLocation.lat, lng: defaultMapLocation.lng });

// Se actualizan cuando el usuario hace clic en el mapa
const updateMapLocation = ({ lat, lng }) => {
  selectedMapLocation.value.lat = lat;
  selectedMapLocation.value.lng = lng;
  console.log('📍 Nueva ubicación seleccionada en el mapa:', lat, lng);
};

// Datos base del formulario
const initialAddress = {
  street: '',
  number: '',
  user_id: ''
};

// Usuarios para el select
const users = ref<any[]>([]);
const fields = ref([
  { key: 'street', label: 'Calle', type: 'text' },
  { key: 'number', label: 'Número', type: 'text' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

onMounted(async () => {
  const res = await import('../../service/UserService');
  const UserService = res.default || res;
  const userRes = await UserService.getUsers();
  users.value = userRes.data;

  // Actualiza SOLO las opciones del campo 'user_id'
  const userField = fields.value.find(f => f.key === 'user_id');
  if (userField) {
    userField.options = users.value.map((u: any) => ({ label: u.name, value: u.id }));
  }
});

// Servicio que agrega lat/lng al enviar
const addressService = {
  create: (address: any) => {
    const fullAddress = {
      ...address,
      latitude: Math.trunc(selectedMapLocation.value.lat),
      longitude: Math.trunc(selectedMapLocation.value.lng)
    };
    console.log('🚀 Enviando dirección (solo enteros):', fullAddress);
    return AddressService.createAddress(fullAddress.user_id, fullAddress);
  },
  get: (id: number | string) => AddressService.getAddress(Number(id))
};
</script>
