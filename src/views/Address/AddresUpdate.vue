<template>
    <Form :initial-object="initialAddress" :fields="fields"
        :validator="(field, value) => AddressValidator.validateField(field, value)" :service="addressService"
        title="Actualizar Dirección" :id="addressId" />
</template>

<script setup lang="ts">
import Form from '../../components/Utils/Form.vue';
import { AddressValidator } from '../../utils/AddressValidator';
import AddressService from '../../service/ServicesAddress';
import type { Address } from '../../models/Address';
import { useRoute } from 'vue-router';

const route = useRoute();
const addressId = Number(route.params.id);
let initialAddress = {
    street: '',
    number: '',
    latitude: 0,
    longitude: 0
};
console.log(initialAddress);




const fields = [
    { key: 'street', label: 'Calle', type: 'text' },
    { key: 'number', label: 'Número', type: 'text' },
    { key: 'latitude', label: 'Latitud', type: 'number' },
    { key: 'longitude', label: 'Longitud', type: 'number' }
];

const addressService = {
    update: (id: number | string, address: Address) => AddressService.updateAddress(id, address),
    get: (id: number | string) => AddressService.getAddress(Number(id))
};
</script>
