import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('jwt'))
  const user = ref<User | null>(null)
  const isAuthenticated = ref(!!token.value)

  function setAuth(jwt: string, userData: User) {
    token.value = jwt
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('jwt', jwt)
  }

  function clearAuth() {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('jwt')
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth
  }
}) 