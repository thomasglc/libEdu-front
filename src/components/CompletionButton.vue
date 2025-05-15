<script setup lang="ts">
import { ref } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps<{
    label?: string
    completedLabel?: string
}>()

const emit = defineEmits<{
    (e: 'complete'): void
}>()

const isCompleted = ref(false)

const handleComplete = (event: MouseEvent) => {
    if (isCompleted.value) return
    
    isCompleted.value = true
    emit('complete')
    
    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    
    // Calculer la position relative pour les confettis (entre 0 et 1)
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = rect.top / window.innerHeight
    
    // Lancer les confettis depuis le bouton
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
        ticks: 200
    })
}
</script>

<template>
    <button 
        @click="handleComplete"
        :class="[
            'btn btn-lg transform transition-all duration-300 ease-in-out',
            isCompleted ? 'btn-success scale-105' : 'btn-primary hover:scale-105'
        ]"
        :disabled="isCompleted"
    >
        <span class="flex items-center gap-2">
            <span v-if="!isCompleted">
                {{ label || 'Marquer comme terminé' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
            <span v-else class="flex items-center gap-2">
                {{ completedLabel || 'Terminé !' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </span>
        </span>
    </button>
</template>

<style scoped>
@keyframes success-pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(var(--success), 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(var(--success), 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(var(--success), 0);
    }
}

.btn-success {
    animation: success-pulse 2s infinite;
}
</style> 