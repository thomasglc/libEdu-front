export interface SubChapter {
    id: number
    documentId: string
    title: string
    order: number
    description: string
}

export interface Chapter {
    id: number
    documentId: string
    title: string
    order: number
    sub_chapters: SubChapter[]
}

export interface Course {
    id: number
    documentId: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export interface CourseDetail extends Omit<Course, 'description' | 'createdAt' | 'updatedAt' | 'publishedAt'> {
    chapters: Chapter[]
}

export interface CourseDetailResponse {
    data: CourseDetail
    meta: Record<string, unknown>
}

export interface PaginationMeta {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export interface CoursesResponse {
    data: Course[]
    meta: {
        pagination: PaginationMeta
    }
} 