import { expect } from 'vitest';
import { InMemoryMealsRepository } from 'test/in-memory-meals-repository';
import { GetSpecificMealUseCase } from './get-specific-meal';
import { makeMeal } from 'test/factories/make-meal';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryMealsRepository: InMemoryMealsRepository;
let sut: GetSpecificMealUseCase;

describe('Fetch Meals Use Case', () => {
  beforeEach(async () => {
    inMemoryMealsRepository = new InMemoryMealsRepository();
    sut = new GetSpecificMealUseCase(inMemoryMealsRepository);
  });

  it('should be able to get a specific meal', async () => {
    await inMemoryMealsRepository.create(
      makeMeal({}, new UniqueEntityId('meal-01')),
    );
    await inMemoryMealsRepository.create(
      makeMeal({}, new UniqueEntityId('meal-02')),
    );
    await inMemoryMealsRepository.create(
      makeMeal({}, new UniqueEntityId('meal-03')),
    );

    const result = await sut.execute({
      mealId: 'meal-02',
    });

    expect(result.isRight()).toBe(true);
  });
});
