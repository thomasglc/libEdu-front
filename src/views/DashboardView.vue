<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CourseService } from '../services/courseService'
import type { Course } from '../types/course'

const courses = ref<Course[]>([])
const isLoading = ref(true)
const error = ref('')

const fetchCourses = async () => {
    try {
        isLoading.value = true
        const response = await CourseService.getCourses()
        courses.value = response.data
    } catch (e) {
        error.value = "Impossible de charger les cours"
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchCourses()
})
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Mes cours</h1>

        <div v-if="error" class="alert alert-error mb-4">
            {{ error }}
        </div>

        <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else-if="courses.length === 0" class="text-center py-8">
            <p class="text-base-content/70">Aucun cours disponible pour le moment.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="course in courses" :key="course.id" class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ course.title }}</h2>
                    <p class="text-base-content/70">{{ course.description }}</p>
                    <div class="card-actions justify-end mt-4">
                        <button class="btn btn-primary">Accéder au cours</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 