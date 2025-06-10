import { defineStore } from 'pinia'
import type { UserLogin } from '../models/UserLogin'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserLogin | null,
  }),
  actions: {
    setUser(userData: UserLogin) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('user')
    },
    loadFromStorage() {
      const stored = localStorage.getItem('user')
      if (stored) {
        try {
          this.user = JSON.parse(stored) as UserLogin
        } catch (error) {
          console.error('Error al cargar el usuario desde localStorage:', error)
          this.clearUser()
        }
      }
    },
  },
})
