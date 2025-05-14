import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  const storedUser = localStorage.getItem('user')
  const token = ref<string | null>(localStorage.getItem('jwt'))
  const user = ref<User | null>(storedUser ? JSON.parse(storedUser) : null)
  const isAuthenticated = ref(!!token.value)

  function setAuth(jwt: string, userData: User) {
    token.value = jwt
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('jwt', jwt)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function clearAuth() {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth
  }
}) 