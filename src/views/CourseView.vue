<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CourseService } from '../services/courseService'
import type { CourseDetail, Chapter, SubChapter } from '../types/course'
import { marked } from 'marked'
import CourseNavigation from '../components/CourseNavigation.vue'

const route = useRoute()
const course = ref<CourseDetail | null>(null)
const isLoading = ref(true)
const error = ref('')
const activeSubChapter = ref<SubChapter | null>(null)


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

const handleSubChapterSelect = (subChapter: SubChapter) => {
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
    <div class="min-h-screen bg-base-100">
        <div v-if="error" class="alert alert-error m-4">
            {{ error }}
        </div>

        <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else-if="course" class="flex">
            <CourseNavigation 
                :course="course"
                :active-sub-chapter="activeSubChapter"
                @select-sub-chapter="handleSubChapterSelect"
            />

            <!-- Main Content -->
            <main class="flex-1 ml-[32rem] min-h-screen bg-base-200">
                <div class="max-w-4xl mx-auto p-8">
                    <div v-if="activeSubChapter" class="prose max-w-none">
                        <h1>{{ activeSubChapter.title }}</h1>
                        <div v-html="formattedContent"></div>
                    </div>
                    <div v-else class="text-center text-base-content/70 mt-12">
                        <p>Sélectionnez un chapitre pour commencer</p>
                    </div>
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