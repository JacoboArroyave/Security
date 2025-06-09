<template>
  <List
    :title="'Lista de Direcciones'"
    :headers="['Calle', 'Número', 'Latitud', 'Longitud']"
    :fields="['street', 'number', 'latitude', 'longitude']"
    :items="addresses"
    :createLink="'addresses-create'"
    :createLabel="'Crear Dirección'"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import List from '../../components/Utils/List.vue';
import { ref, onMounted } from 'vue';
import AddressService from '../../service/ServicesAddress.ts';
import type { Address } from '../../models/Address';

const addresses = ref<Address[]>([]);

const fetchAddresses = async () => {
    console.log("hello");

  const res = await AddressService.getAddresses();
  addresses.value = res.data;
};

const actions = [   
  {
    component: 'router-link',
    getProps: (item: any) => ({
      to: `/addresses/update/${item.id}`,
      class: 'text-blue-600 hover:text-blue-800 flex items-center'
    }),
    slot: () => 'Editar'
  },
  {
    component: 'button',
    getProps: (item: any) => ({
      class: 'text-red-600 hover:text-red-800 flex items-center',
      onClick: () => deleteAddress(item.id)
    }),
    slot: () => 'Eliminar'
  }
];

const deleteAddress = async (id: any) => {
  await AddressService.deleteAddress(id);
  fetchAddresses();
};

onMounted(fetchAddresses);
</script>
