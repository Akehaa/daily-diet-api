import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Meal } from '@/domain/diet/enterprise/entities/meal';
import { Prisma, Meal as PrismaMeal } from '@prisma/client';

export class PrismaMealMapper {
  static toDomain(raw: PrismaMeal): Meal {
    return Meal.create(
      {
        userId: new UniqueEntityId(raw.userId),
        name: raw.name,
        description: raw.description,
        date: raw.date,
        hour: raw.hour,
        isOnTheDiet: raw.isOnTheDiet,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(meal: Meal): Prisma.MealUncheckedCreateInput {
    return {
      id: meal.id.toString(),
      userId: meal.userId.toString(),
      name: meal.name,
      description: meal.description,
      date: meal.date,
      hour: meal.hour,
      isOnTheDiet: meal.isOnTheDiet,
    };
  }
}
