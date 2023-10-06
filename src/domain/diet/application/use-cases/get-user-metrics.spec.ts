import { InMemoryMealsRepository } from 'test/repositories/in-memory-meals-repository';
import { GetUserMetricsUseCase } from './get-user-metrics';
import { makeMeal } from 'test/factories/make-meal';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryMealsRepository: InMemoryMealsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository();
    sut = new GetUserMetricsUseCase(inMemoryMealsRepository);
  });

  it('should be able to get user metrics', async () => {
    await inMemoryMealsRepository.create(
      makeMeal({
        name: 'meal-01',
        userId: new UniqueEntityId('user-01'),
        isOnTheDiet: true,
      }),
    );
    await inMemoryMealsRepository.create(
      makeMeal({
        name: 'meal-02',
        userId: new UniqueEntityId('user-01'),
        isOnTheDiet: true,
      }),
    );
    await inMemoryMealsRepository.create(
      makeMeal({
        name: 'meal-03',
        userId: new UniqueEntityId('user-01'),
        isOnTheDiet: false,
      }),
    );
    await inMemoryMealsRepository.create(
      makeMeal({
        name: 'meal-04',
        userId: new UniqueEntityId('user-02'),
        isOnTheDiet: false,
      }),
    );

    const result = await sut.execute({
      userId: 'user-01',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject({
      totalMeals: 3,
      totalMealsOnDiet: 2,
      totalMealsOutDiet: 1,
      bestSequenceOfMeals: 2,
    });
  });

  it('should not be able to get another user metrics', async () => {
    await inMemoryMealsRepository.create(
      makeMeal({
        name: 'meal-04',
        userId: new UniqueEntityId('user-02'),
        isOnTheDiet: false,
      }),
    );

    const result = await sut.execute({
      userId: 'user-01',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
