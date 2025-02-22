import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

// eslint-disable-next-line
type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())
    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.answerRepository.delete(answer)

    return right({})
  }
}
