<template>
  <div id="map" style="height: 300px;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const emit = defineEmits(['update:location']);
const props = defineProps({
  lat: Number,
  lng: Number,
  zoom: Number
});

let map;
let marker;

onMounted(() => {
  map = L.map('map').setView([props.lat, props.lng], props.zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  marker = L.marker([props.lat, props.lng], { draggable: true }).addTo(map);

  marker.on('dragend', () => {
    const { lat, lng } = marker.getLatLng();
    emit('update:location', { lat, lng });
  });

  map.on('click', e => {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
    emit('update:location', { lat, lng });
  });
});
</script>
