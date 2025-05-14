export interface Course {
    id: number
    documentId: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
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