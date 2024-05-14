import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { vi } from 'vitest'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscribe registered (listen the event of "answer created")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Creating a answer without save it on database
    const aggregate = CustomAggregate.create()

    // Ensuring that event has been created BUT NOT was dispatch
    expect(aggregate.domainEvents).toHaveLength(1)

    // Saving answer on database and after that, dispatch the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // The subscriber listen the event and does what to be done with data
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
