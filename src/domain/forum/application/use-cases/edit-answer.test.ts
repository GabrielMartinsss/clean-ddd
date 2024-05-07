import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
// system under test
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Content test',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Content test',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: 'author-2',
        content: 'Content test',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
