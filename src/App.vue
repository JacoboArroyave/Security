<template>
  <router-view />
</template>

<script lang="ts">
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';



// Añadir un interceptor global para todas las solicitudes
axios.interceptors.request.use(
  (config) => {
    // Definir rutas que deben estar excluidas del token
    const excepciones = []; // Palabras clave a excluir

    // Verificar si la URL de la solicitud contiene alguna de las palabras clave en la lista de excepciones
    const isExcepcion = excepciones.some(keyword => config.url.includes(keyword));

    if (!isExcepcion) {
      // Obtener el token del almacenamiento local (o de donde lo guardes)

      const user = JSON.parse(localStorage.getItem('user'));
      console.log("agregando token " + user["token"]);
      if (user) {
        // Si el token existe, agregarlo al encabezado Authorization
        config.headers['Authorization'] = `Bearer ${user["token"]}`;
      }
    }
    return config;
  },
  (error) => {
    // Manejar cualquier error en la solicitud
    return Promise.reject(error);
  }
);
export default {
  name: 'App'
}
</script>
