<template>
<Form
  :initial-object="initialAddress"
  :fields="fields"
  :validator="(field, value) => AddressValidator.validateField(field, value)"
  :service="addressService"
  title="Crear Dirección"
    />

</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { AddressValidator } from '../../utils/AddressValidator';
import AddressService from '../../service/ServicesAddress';
import type { Address } from '../../models/Address';
import { ref, onMounted } from 'vue';

const initialAddress = {
  street: '',
  number: '',
  latitude: 0,
  longitude: 0
};

const users = ref<any[]>([]);
const fields = ref([
  { key: 'street', label: 'Calle', type: 'text' },
  { key: 'number', label: 'Número', type: 'text' },
  { key: 'latitude', label: 'Latitud', type: 'number' },
  { key: 'longitude', label: 'Longitud', type: 'number' },
  { key: 'user_id', label: 'Usuario', type: 'select', options: [] }
]);

onMounted(async () => {
  const res = await import('../../service/UserService');
  const UserService = res.default || res;
  const userRes = await UserService.getUsers();
  users.value = userRes.data;
  fields.value = fields.value.map(f =>
    f.key === 'user_id'
      ? { ...f, options: users.value.map((u: any) => ({ label: u.name, value: u.id })) }
      : f
  );
});

const addressService = {
  create: (address: any) => {
    // El usuario seleccionado se envía dinámicamente
    return AddressService.createAddress(address.user_id, address);
  },
  get: (id: number | string) => AddressService.getAddress(Number(id))
};
</script>
