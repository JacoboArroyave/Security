<script setup>
import { ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const error = ref(null)
const router = useRouter()
const userStore = useUserStore()

const allowedEmails = [
  'camiloreact12@gmail.com',
  'andresfelipegiraldorojas485@gmail.com',
  'jacobo.arroyave46095@ucaldas.edu.co',
]
onMounted(() => {
  userStore.loadFromStorage()
  const storedUser = userStore.user
  if (storedUser && !allowedEmails.includes(storedUser.email)) {
    userStore.clearUser()
  }

  window.handleLoginSuccess = handleLoginSuccess

  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: '957915397315-heejc9v3hqv5vbg2r4ao2lo15snaaor1.apps.googleusercontent.com',
      callback: handleLoginSuccess,
    })
    window.google.accounts.id.renderButton(
      document.querySelector('.g_id_signin'),
      { theme: 'outline', size: 'large' }
    )
  }
})


const handleLoginSuccess = (response) => {
  const credential = response.credential
  try {
    const decoded = jwtDecode(credential)
    console.log('Token decodificado:', decoded)

    if (allowedEmails.includes(decoded.email)) {
      userStore.setUser(decoded)
      router.push('/')
    } else {
      error.value = 'Este correo no está autorizado para ingresar.'
      userStore.clearUser()
    }
  } catch (err) {
    error.value = 'Error al procesar la información de inicio de sesión.'
    console.error(err)
    userStore.clearUser()
  }
}

const handleLoginError = () => {
  error.value = 'No se pudo completar el inicio de sesión'
  console.log('Login fallido')
}
</script>

<template>
  <div>
    <h1>Iniciar sesión</h1>
    <div id="g_id_onload"
         data-client_id="957915397315-heejc9v3hqv5vbg2r4ao2lo15snaaor1.apps.googleusercontent.com"
         data-context="signin"
         data-callback="handleLoginSuccess"
         data-auto_prompt="false">
    </div>
    <div class="g_id_signin"
         data-type="standard"
         data-shape="rectangular"
         data-theme="outline"
         data-text="signin_with"
         data-size="large"
         data-logo_alignment="left">
    </div>

    <p v-if="error">{{ error }}</p>
  </div>
</template>


<style scoped>
/* Estilos opcionales */
</style>

