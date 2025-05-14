<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const handleLogout = () => {
    authStore.clearAuth()
    router.push('/login')
}
</script>

<template>
    <div class="navbar bg-base-100 shadow-lg px-4">
        <div class="flex-1">
            <router-link to="/" class="text-xl font-bold">LibEdu</router-link>
        </div>
        <div class="flex-none gap-4">
            <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
                <span class="text-base-content/70">
                    {{ authStore.user?.username }}
                </span>
                <a @click="handleLogout" class="text-error cursor-pointer">
                    Se déconnecter
                </a>

            </div>
        </div>
    </div>
</template>