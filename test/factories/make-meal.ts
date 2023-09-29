import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Meal, MealProps } from '@/domain/diet/enterprise/entities/meal';
import { faker } from '@faker-js/faker';

export function makeMeal(override: Partial<MealProps>, id?: UniqueEntityId) {
  const meal = Meal.create(
    {
      userId: new UniqueEntityId(),
      date: '2023-09-29',
      hour: '16:00:00',
      name: faker.lorem.sentence(),
      description: faker.lorem.text(),
      isOnTheDiet: true,
      ...override,
    },
    id,
  );

  return meal;
}
