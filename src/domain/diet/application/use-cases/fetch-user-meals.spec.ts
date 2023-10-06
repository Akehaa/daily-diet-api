import { InMemoryMealsRepository } from 'test/repositories/in-memory-meals-repository';
import { FetchUserMealsUseCase } from './fetch-user-meals';
import { makeMeal } from 'test/factories/make-meal';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryMealsRepository: InMemoryMealsRepository;
let sut: FetchUserMealsUseCase;

describe('Fetch Meals Use Case', () => {
  beforeEach(async () => {
    inMemoryMealsRepository = new InMemoryMealsRepository();
    sut = new FetchUserMealsUseCase(inMemoryMealsRepository);
  });

  it('should be able to fetch user meals', async () => {
    await inMemoryMealsRepository.create(
      makeMeal({
        name: 'meal-01',
        userId: new UniqueEntityId('user-01'),
      }),
    );
    await inMemoryMealsRepository.create(
      makeMeal({
        name: 'meal-02',
        userId: new UniqueEntityId('user-01'),
      }),
    );

    const result = await sut.execute({
      userId: 'user-01',
    });

    expect(result.value.meals).toHaveLength(2);
    expect(result.value.meals).toEqual([
      expect.objectContaining({ name: 'meal-01' }),
      expect.objectContaining({ name: 'meal-02' }),
    ]);
  });
});
