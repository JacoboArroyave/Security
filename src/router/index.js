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
        path: 'devices/update/:id',
        name: 'DeviceUpdate',
        component: () => import('../views/Device/DeviceUpdate.vue')
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
        path: '/security-questions/update/:id',
        name: 'SecurityQuestionUpdate',
        component: () => import('../views/SecurityQuestion/SecurityQuestionUpdate.vue')
      },
      {
        path: 'digital-signature',
        name: 'DigitalSignatureList',
        component: () => import('../views/DigitalSignature/DigitalSignatureList.vue')
      },
      {
        path: 'signatures/update/:id',
        name: 'DigitalSignatureUpdate',
        component: () => import('../views/DigitalSignature/DigitalSignatureUpdateForm.vue')
      },
      {
        path: 'signatures/create',
        name: 'DigitalSignatureCreateForm',
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
        path: 'answers/update/:id',
        name: 'AnswerUpdate',
        component: () => import('../views/Answer/AnswerUpdate.vue')
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
        path: '/session',
        name: 'SessionsList',
        component: () => import('../views/Sessions/SessionsList.vue'),
      },
      {
        path: '/sessions/create',
        name: 'SessionsCreate',
        component: () => import('../views/Sessions/SessionsCreate.vue'),
      },
      {
        path: '/sessions/update/:id',
        name: 'SessionsUpdate',
        component: () => import('../views/Sessions/SessionsUpdate.vue'),
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../views/Users/UsersList.vue'),
      },
      {
        path: '/users/create',
        name: 'UserCreate',
        component: () => import('../views/Users/UserCreate.vue')
      },
      {
        path: 'role',
        name: 'RolesList',
        component: () => import('../views/Role/RoleList.vue')
      },
      {
        path: 'roles-create',
        name: 'RolesCreate',
        component: () => import('../views/Role/RoleCreateForm.vue')
      },
      {
        path: 'user-rol-list/role/:id',
        name: 'UserRolList',
        component: () => import('../views/UserRol/UserRolListbyRole.vue')
      },
      {
        path: 'roles-update/:id',
        name: 'RolesUpdate',
        component: () => import('../views/Role/RoleUpdateForm.vue')
      },
      {
        path: 'user-role-create',
        name: 'UserRolCreate',
        component: () => import('../views/UserRol/UserRolCreate.vue')
      },
      {
        path: 'user-role-update/:id',
        name: 'UserRolUpdate',
        component: () => import('../views/UserRol/UserRolUpdate.vue')
      },
      {
        path: 'user-role-list',
        name: 'UserRoleList',
        component: () => import('../views/UserRol/UserRolList.vue')
      },
      {
        path: 'role-permissions/role/:id',
        name: 'RolePermissionsList',
        component: () => import('../views/RolePermissions/ListPermissionsByRole.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/Profile/ProfileList.vue')
      },
      {
        path: 'profiles-create',
        name: 'profileCreate',
        component: () => import('../views/Profile/ProfileCreate.vue')
      },
      {
        path: 'profiles-update/:id',
        name: 'profileUpdate',
        component: () => import('../views/Profile/ProfilesUpdate.vue')
      },
      {
        path: 'user-role/role/:id',
        name: 'userRoleByRole',
        component: () => import('../views/Role/CreateNewUserForRole.vue') 
      },
      {
        path: 'role-permission',
        name: 'RolePermisionList',
        component: () => import('../views/RolePermissions/RolePermissionsList.vue')
      },
      {
        path: 'role-permission-create',
        name: 'RolePermisionCreate',
        component: () => import('../views/RolePermissions/RolePermissionsCreate.vue')
      },
      {
        path: '/password/by-user/:id',
        name: 'PasswordByUser',
        component: () => import('../views/Password/ListByUser.vue')
      },
      {
        path: 'profile/by-user/:id',
        name: 'ProfileListByUser',
        component: () => import('../views/Profile/ProfileListByUser.vue')
      },
      {
        path: 'device/by-user/:id',
        name: 'DeviceListByUser',
        component: () => import('../views/Device/DeviceListByUser.vue')
      },
      {
        path: 'digital-signature/by-user/:id',
        name: 'DigitalSignatureListByUser',
        component: () => import('../views/DigitalSignature/DigitalSignatureListByUser.vue')
      },
      {
        path: 'sessions/by-user/:id',
        name: 'SessionsListByUser',
        component: () => import('../views/Sessions/SessionsListByUser.vue')
      },
      {
        path: 'addresses/by-user/:id',
        name: 'AddressListByUser',
        component: () => import('../views/Address/AddressListByUser.vue')
      },
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
