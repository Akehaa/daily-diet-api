import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Meal, MealProps } from '@/domain/diet/enterprise/entities/meal';
import { PrismaMealMapper } from '@/infra/database/prisma/mappers/prisma-meal-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

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

@Injectable()
export class MealFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMeal(data: Partial<MealProps> = {}): Promise<Meal> {
    const meal = makeMeal(data);

    await this.prisma.meal.create({
      data: PrismaMealMapper.toPrisma(meal),
    });

    return meal;
  }
}
