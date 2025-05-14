<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { AuthService } from '../services/authService'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
    try {
        error.value = ''
        isLoading.value = true

        const data = await AuthService.login({
            identifier: email.value,
            password: password.value
        })

        authStore.setAuth(data.jwt, data.user)
        router.push('/dashboard')
    } catch (e) {
        if (axios.isAxiosError(e)) {
            error.value = e.response?.data?.error?.message || 'Erreur lors de la connexion'
        } else {
            error.value = 'Une erreur est survenue'
        }
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="card w-96 bg-base-100 shadow-lg">
            <div class="card-body gap-4">
                <div class="text-center space-y-3">
                    <h2 class="text-3xl font-bold">Connexion</h2>
                    <p class="text-base-content/70">Accédez à vos ressources pédagogiques</p>
                </div>

                <form @submit.prevent="handleSubmit" class="p-4">
                    <div v-if="error" class="alert alert-error mb-4">
                        {{ error }}
                    </div>

                    <div class="input input-bordered mb-2">
                        <EnvelopeIcon class="w-5 h-5 text-base-content/70" />
                        <input type="email" v-model="email" placeholder="Email" class="grow" required />
                    </div>

                    <div class="input input-bordered mb-4">
                        <LockClosedIcon class="w-5 h-5 text-base-content/70" />
                        <input type="password" v-model="password" placeholder="Mot de passe" class="grow" required />
                    </div>

                    <div class="flex justify-between items-center text-sm mb-2">
                        <label class="label cursor-pointer gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span class="label-text">Se souvenir de moi</span>
                        </label>
                        <a href="#" class="link link-primary">Mot de passe oublié?</a>
                    </div>

                    <button 
                        type="submit" 
                        class="btn btn-primary w-full mt-4" 
                        :class="{ 'loading': isLoading }"
                        :disabled="isLoading"
                    >
                        {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>