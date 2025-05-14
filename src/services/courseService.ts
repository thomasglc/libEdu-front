import { apiClient } from '../config/api'
import type { CoursesResponse, CourseDetailResponse } from '../types/course'
import qs from 'qs'

export class CourseService {
    static async getCourses(): Promise<CoursesResponse> {
        const { data } = await apiClient.get<CoursesResponse>('/api/courses')
        return data
    }

    static async getCourseByDocumentId(documentId: string): Promise<CourseDetailResponse> {
        const query = qs.stringify({
            sort: ['title:asc'],
            populate: {
                chapters: {
                    fields: ['title', 'order'],
                    populate: {
                        sub_chapters: {
                            fields: ['title', 'order', 'description']
                        }
                    }
                }
            },
            fields: ['title'],
            pagination: {
                pageSize: 10,
                page: 1
            },
            status: 'published',
            locale: ['en']
        }, {
            encodeValuesOnly: true
        })

        const { data } = await apiClient.get<CourseDetailResponse>(`/api/courses/${documentId}?${query}`)
        return data
    }
} 