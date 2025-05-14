<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CourseService } from '../services/courseService'
import type { CourseDetail, Chapter, SubChapter } from '../types/course'
import { marked } from 'marked'

const route = useRoute()
const course = ref<CourseDetail | null>(null)
const isLoading = ref(true)
const error = ref('')
const activeSubChapter = ref<SubChapter | null>(null)

const sortedChapters = computed(() => {
    if (!course.value) return []
    return [...course.value.chapters].sort((a, b) => a.order - b.order)
})

const fetchCourse = async () => {
    try {
        isLoading.value = true
        const documentId = route.params.documentId as string
        const response = await CourseService.getCourseByDocumentId(documentId)
        course.value = response.data
        
        // Sélectionner le premier sous-chapitre par défaut
        if (course.value.chapters.length > 0) {
            const firstChapter = [...course.value.chapters]
                .sort((a, b) => a.order - b.order)[0]
            if (firstChapter.sub_chapters.length > 0) {
                activeSubChapter.value = [...firstChapter.sub_chapters]
                    .sort((a, b) => a.order - b.order)[0]
            }
        }
    } catch (e) {
        error.value = "Impossible de charger le cours"
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

const selectSubChapter = (subChapter: SubChapter) => {
    activeSubChapter.value = subChapter
}

const formattedContent = computed(() => {
    if (!activeSubChapter.value?.description) return ''
    return marked(activeSubChapter.value.description)
})

onMounted(() => {
    fetchCourse()
})
</script>

<template>
    <div class="min-h-screen">
        <div v-if="error" class="alert alert-error m-4">
            {{ error }}
        </div>

        <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else-if="course" class="flex">
            <!-- Sidebar Navigation -->
            <aside class="w-64 h-[calc(100vh-4rem)] overflow-y-auto fixed left-0 top-16 p-4 bg-base-200 border-r border-base-300">
                <div class="sticky top-0">
                    <h2 class="text-lg font-bold mb-4">{{ course.title }}</h2>
                    <nav>
                        <div v-for="chapter in sortedChapters" :key="chapter.id" class="mb-4">
                            <h3 class="font-medium text-base mb-2 text-base-content/70">
                                {{ chapter.title }}
                            </h3>
                            <ul class="space-y-1">
                                <li v-for="subChapter in chapter.sub_chapters.sort((a, b) => a.order - b.order)"
                                    :key="subChapter.id">
                                    <button 
                                        @click="selectSubChapter(subChapter)"
                                        class="w-full text-left px-2 py-1 rounded hover:bg-base-300 transition-colors"
                                        :class="{ 
                                            'bg-primary/10 text-primary': activeSubChapter?.id === subChapter.id,
                                            'text-base-content/70': activeSubChapter?.id !== subChapter.id
                                        }">
                                        {{ subChapter.title }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 ml-64 p-8 max-w-4xl mx-auto">
                <div v-if="activeSubChapter" class="prose max-w-none">
                    <h1>{{ activeSubChapter.title }}</h1>
                    <div v-html="formattedContent"></div>
                </div>
                <div v-else class="text-center text-base-content/70 mt-12">
                    <p>Sélectionnez un chapitre pour commencer</p>
                </div>
            </main>
        </div>
    </div>
</template>

<style>
.prose pre {
    background-color: hsl(var(--b2));
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
}

.prose code {
    background-color: hsl(var(--b2));
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
}
</style> 