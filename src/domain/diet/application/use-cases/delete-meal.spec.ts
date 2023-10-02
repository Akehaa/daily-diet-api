import { InMemoryMealsRepository } from 'test/in-memory-meals-repository';
import { DeleteMealUseCase } from './delete-meal';
import { makeMeal } from 'test/factories/make-meal';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryMealsRepository: InMemoryMealsRepository;
let sut: DeleteMealUseCase;

describe('Delete Meal', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository();
    sut = new DeleteMealUseCase(inMemoryMealsRepository);
  });

  it('should be able to delete a meal', async () => {
    const newMeal = makeMeal(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('meal-1'),
    );

    await inMemoryMealsRepository.create(newMeal);

    await sut.execute({
      userId: 'user-1',
      mealId: 'meal-1',
    });

    expect(inMemoryMealsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a meal from antoher user', async () => {
    const newMeal = makeMeal(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('meal-1'),
    );

    await inMemoryMealsRepository.create(newMeal);

    const result = await sut.execute({
      mealId: newMeal.id.toValue(),
      userId: 'user-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
