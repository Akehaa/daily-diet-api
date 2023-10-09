import { MealsRepository } from '@/domain/diet/application/repositories/meals-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Meal } from '@/domain/diet/enterprise/entities/meal';
import { PrismaMealMapper } from '../mappers/prisma-meal-mapper';

@Injectable()
export class PrismaMealsRepository implements MealsRepository {
  constructor(private prisma: PrismaService) {}

  async create(meal: Meal): Promise<void> {
    const data = PrismaMealMapper.toPrisma(meal);

    await this.prisma.meal.create({
      data,
    });
  }

  async save(meal: Meal): Promise<void> {
    const data = PrismaMealMapper.toPrisma(meal);

    await this.prisma.meal.update({
      where: {
        id: meal.id.toString(),
      },
      data,
    });
  }

  async delete(meal: Meal): Promise<void> {
    const data = PrismaMealMapper.toPrisma(meal);

    await this.prisma.meal.delete({
      where: {
        id: data.id,
      },
    });
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await this.prisma.meal.findUnique({
      where: {
        id,
      },
    });

    if (!meal) {
      null;
    }

    return PrismaMealMapper.toDomain(meal);
  }

  async findManyById(userId: string): Promise<Meal[]> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
      },
    });
    return meals.map(PrismaMealMapper.toDomain);
  }

  async countByUserId(userId: string): Promise<number> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
      },
    });

    return meals.length;
  }

  async countFalseBooleans(userId: string): Promise<number> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
      },
    });

    return meals.filter((meal) => meal.isOnTheDiet === false).length;
  }

  async countTrueBooleans(userId: string): Promise<number> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
      },
    });

    return meals.filter((meal) => meal.isOnTheDiet === true).length;
  }

  async countSequenceOfTrueBooleans(userId: string): Promise<number> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
      },
    });

    let sequenceContinued = false;
    let count = 0;

    const sequences = [];

    for (let i = 0; i < meals.length; i++) {
      const item = meals[i];

      if (item.isOnTheDiet === false && sequenceContinued === true) {
        sequenceContinued = false;
        sequences.push(count);
        count = 0;
        continue;
      }

      if (item.isOnTheDiet === true) {
        sequenceContinued = true;
        count++;
      }

      if (i === meals.length - 1 && item.isOnTheDiet === true) {
        sequences.push(count);
      }
    }

    const longestCount = sequences.length ? Math.max(...sequences) : 0;

    return longestCount;
  }
}
