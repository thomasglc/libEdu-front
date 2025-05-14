import { apiClient } from '../config/api'
import type { CoursesResponse } from '../types/course'

export class CourseService {
    static async getCourses(): Promise<CoursesResponse> {
        const { data } = await apiClient.get<CoursesResponse>('/api/courses')
        return data
    }
} 