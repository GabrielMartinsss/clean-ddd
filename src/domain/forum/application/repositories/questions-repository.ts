import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
}
