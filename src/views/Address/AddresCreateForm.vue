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

const initialAddress = {
  street: '',
  number: '',
  latitude: 0,
  longitude: 0
};

const fields = [
  { key: 'street', label: 'Calle', type: 'text' },
  { key: 'number', label: 'Número', type: 'text' },
  { key: 'latitude', label: 'Latitud', type: 'number' },
  { key: 'longitude', label: 'Longitud', type: 'number' }
];

const addressService = {
  create: (address: Address) => AddressService.createAddress("1", address),
  get: (id: number | string) => AddressService.getAddress(Number(id))
};
</script>
