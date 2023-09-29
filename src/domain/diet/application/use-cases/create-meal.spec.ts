import { InMemoryMealsRepository } from 'test/in-memory-meals-repository';
import { CreateMealUseCase } from './create-meal';

let inMemoryMealsRepository: InMemoryMealsRepository;
let sut: CreateMealUseCase;

describe('CreateMeal', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository();
    sut = new CreateMealUseCase(inMemoryMealsRepository);
  });

  it('should be able to create a meal', async () => {
    const result = await sut.execute({
      userId: '1',
      name: 'Meat',
      description: 'hamburger',
      date: '2023-09-28',
      hour: '15:40',
      isOnTheDiet: true,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryMealsRepository.items[0]).toEqual(result.value.meal);
  });
});
