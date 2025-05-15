<script setup lang="ts">
import type { CourseDetail, SubChapter } from '../types/course'
import { computed } from 'vue'

interface Props {
  course: CourseDetail
  activeSubChapter: SubChapter | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'select-sub-chapter': [subChapter: SubChapter]
}>()

const sortedChapters = computed(() => {
  return [...props.course.chapters].sort((a, b) => a.order - b.order)
})

const handleSubChapterSelect = (subChapter: SubChapter) => {
  emit('select-sub-chapter', subChapter)
}
</script>

<template>
  <aside class="w-[24rem] h-[calc(100vh-4rem)] overflow-y-auto fixed left-0 top-16 p-6 bg-base-100 border-r-2 border-r-primary border-opacity-30">
    <div class="sticky top-0">
      <h2 class="text-xl font-bold mb-6 text-base-content">
        {{ course.title }}
      </h2>
      <nav class="pr-4">
        <div v-for="chapter in sortedChapters" :key="chapter.id" class="mb-6">
          <h3 class="font-medium text-lg mb-2 text-base-content/70">
            {{ chapter.title }}
          </h3>
          <ul class="space-y-2">
            <li v-for="subChapter in chapter.sub_chapters.sort((a, b) => a.order - b.order)"
              :key="subChapter.id">
              <button 
                @click="handleSubChapterSelect(subChapter)"
                class="w-full text-left px-4 py-2 rounded hover:bg-base-300 transition-colors cursor-pointer text-base"
                :class="{ 
                  'bg-primary/10 text-primary font-medium': activeSubChapter?.id === subChapter.id,
                  'text-base-content/70 hover:text-base-content': activeSubChapter?.id !== subChapter.id
                }">
                {{ subChapter.title }}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </aside>
</template> 