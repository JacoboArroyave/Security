import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
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
        path:"role",
        name:"RolesList",
        component: () => import('../views/Role/RoleList.vue')
      },
      {
        path:"roles-create",
        name:"RolesCreate",
        component: () => import('../views/Role/RoleCreateForm.vue')
      },
      {
        path:"user-rol-list/role/:id",
        name:"UserRolList",
        component: () => import('../views/UserRol/UserRolListbyRole.vue')
      },
      {
        path:"roles-update/:id",
        name:"RolesUpdate",
        component: () => import('../views/Role/RoleUpdateForm.vue')
      },
      {
        path:"user-role-create",
        name:"UserRolCreate",
        component: () => import('../views/UserRol/UserRolCreate.vue')
      },
      {
        path:"user-role-update/:id",
        name:"UserRolUpdate",
        component: () => import('../views/UserRol/UserRolUpdate.vue')
      },
      {
        path:"user-role-list",
        name:"UserRoleList", 
        component: () => import('../views/UserRol/UserRolList.vue')
      }



    ]

  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
