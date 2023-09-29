import { InMemoryMealsRepository } from 'test/in-memory-meals-repository';
import { EditMealUseCase } from './edit-meal';
import { makeMeal } from 'test/factories/make-meal';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryMealsRepository: InMemoryMealsRepository;
let sut: EditMealUseCase;

describe('Edit Meal', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository();

    sut = new EditMealUseCase(inMemoryMealsRepository);
  });

  it('should be able to edit a meal', async () => {
    const newMeal = makeMeal(
      {
        userId: new UniqueEntityId('user-1'),
      },
      new UniqueEntityId('meal-1'),
    );

    await inMemoryMealsRepository.create(newMeal);

    await sut.execute({
      mealId: newMeal.id.toValue(),
      userId: 'user-1',
      name: 'Test meal',
      description: 'Test description',
      date: '2023-10-10',
      hour: '19:00:00',
      isOnTheDiet: false,
    });

    console.log(inMemoryMealsRepository.items[0]);

    expect(inMemoryMealsRepository.items[0]).toMatchObject({
      name: 'Test meal',
      description: 'Test description',
      date: '2023-10-10',
      hour: '19:00:00',
      isOnTheDiet: false,
    });
  });
});
