<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
    // TODO: Implémenter la logique de connexion
    console.log('Tentative de connexion:', { email: email.value, password: password.value })
}
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-primary/5 to-base-100 flex items-center justify-center">
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body gap-8">
                <div class="text-center space-y-3">
                    <h2 class="text-3xl font-bold">Connexion</h2>
                    <p class="text-base-content/70">Accédez à vos ressources pédagogiques</p>
                </div>

                <form @submit.prevent="handleSubmit" class="p-4">
                    <div class="input input-bordered mb-2">
                        <EnvelopeIcon class="w-5 h-5 text-base-content/70" />
                        <input type="email" v-model="email" placeholder="Email" class="grow" required />
                    </div>

                    <div class="input input-bordered mb-2">
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

                    <button type="submit" class="btn btn-primary w-full mt-4">Se connecter</button>
                </form>
            </div>
        </div>
    </div>
</template>