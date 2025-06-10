import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../Login.vue')
      },
      {
        path: 'addresses',
        name: 'AddressList',
        component: () => import('../views/Address/AddressList.vue')
      },
      {
        path: 'addresses-create',
        name: 'AddressCreate',
        component: () => import('../views/Address/AddresCreateForm.vue')
      },
      {
        path: 'addresses-update/:id',
        name: 'AddressUpdate',
        component: () => import('../views/Address/AddresUpdate.vue')
      },
      {
        path: 'password',
        name: 'PasswordList',
        component: () => import('../views/Password/PasswordList.vue')
      },
      {
        path: 'password-create',
        name: 'PasswordCreate',
        component: () => import('../views/Password/PasswordCreateForm.vue')
      },
      {
        path: 'password-update/:id',
        name: 'PasswordUpdate',
        component: () => import('../views/Password/PasswordUpdateForm.vue')
      },
      {
        path: 'device',
        name: 'DeviceList',
        component: () => import('../views/Device/DeviceList.vue')
      },
      {
        path: 'devices/create',
        name: 'DeviceCreate',
        component: () => import('../views/Device/DeviceCreateForm.vue')
      },
      {
        path: 'security-question',
        name: 'SecurityQuestionList',
        component: () => import('../views/SecurityQuestion/SecurityQuestionList.vue')
      },
      {
        path: 'security-questions/create',
        name: 'SecurityQuestionCreate',
        component: () => import('../views/SecurityQuestion/SecurityQuestionCreateForm.vue')
      },
      {
        path: 'digital-signature',
        name: 'DigitalSignatureList',
        component: () => import('../views/DigitalSignature/DigitalSignatureList.vue')
      },
      {
        path: 'signatures/create',
        name: 'DigitalSignatureCreate',
        component: () => import('../views/DigitalSignature/DigitalSignatureCreateForm.vue')
      },
      {
        path: 'answer',
        name: 'AnswerList',
        component: () => import('../views/Answer/AnswerList.vue')
      },
      {
        path: 'answers/create',
        name: 'AnswerCreate',
        component: () => import('../views/Answer/AnswerCreateForm.vue')
      },
      {
        path: 'permissions',
        name: 'PermissionList',
        component: () => import('../views/Permissions/PermissionsList.vue')
      },
      {
        path: 'permissions/create',
        name: 'PermissionCreate',
        component: () => import('../views/Permissions/PermissionsCreate.vue')
      },
      {
        path: '/permissions/update/:id',
        name: 'PermissionUpdate',
        component: () => import('../views/Permissions/PermissionsUpdate.vue'),
        props: true
      },
      {
        path: '/sessions',
        name: 'SessionsList',
        component: () => import('../views/Sessions/SessionsList.vue'),
      },
      {
        path: '/sessions/create',
        name: 'SessionsCreate',
        component: () => import('../views/Sessions/SessionsCreate.vue'),
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/Users/UsersList.vue'),
      },
      {
  path: '/users/create',
  name: 'UserCreate',
  component: () => import('../views/users/UserCreate.vue')
}


    ]

  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const storedUser = localStorage.getItem('user')

  // Si hay algo en localStorage pero no en el store, sincronízalo
  if (storedUser && !store.user) {
    store.setUser(JSON.parse(storedUser))
  }

  const isAuthenticated = !!store.user

  // Permitir acceso al login siempre
  if (to.name === 'login') {
    if (isAuthenticated) {
      next({ name: 'Home' }) // Si ya está logueado, redirige al Home
    } else {
      next() // Deja pasar al login
    }
  } else {
    // Para cualquier otra ruta
    if (!isAuthenticated) {
      next({ name: 'login' }) // Si no está logueado, redirige a login
    } else {
      next() // Si está logueado, deja pasar
    }
  }
})


export default router
