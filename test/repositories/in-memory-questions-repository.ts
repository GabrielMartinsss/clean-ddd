import { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id !== question.id)
    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)
    return question !== undefined ? question : null
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)
    return question !== undefined ? question : null
  }
}
