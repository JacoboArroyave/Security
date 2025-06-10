// // src/stores/UserStore.ts
// import { defineStore } from 'pinia'
// import type { UserLogin } from '../models/UserLogin'

// export const useUserStore = defineStore('user', {
//   state: () => ({
//     user: (() => {
//       try {
//         const data = localStorage.getItem('user')
//         return data ? (JSON.parse(data) as UserLogin) : null
//       } catch {
//         return null
//       }
//     })()
//   }),
//   actions: {
//     setUser(userData: UserLogin) {
//       this.user = userData
//       localStorage.setItem('user', JSON.stringify(userData))
//     },
//     clearUser() {
//       this.user = null
//       localStorage.removeItem('user')
//     }
//   }
// })
