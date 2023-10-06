import { MealsRepository } from '@/domain/diet/application/repositories/meals-repository';
import { Meal } from '@/domain/diet/enterprise/entities/meal';

export class InMemoryMealsRepository extends MealsRepository {
  public items: Meal[] = [];

  async create(meal: Meal) {
    this.items.push(meal);
  }

  async findById(id: string) {
    const meal = this.items.find((item) => item.id.toString() === id);

    if (!meal) {
      return null;
    }

    return meal;
  }

  async findManyById(userId: string) {
    const meals = this.items.filter(
      (meal) => meal.userId.toString() === userId,
    );

    return meals;
  }

  async save(meal: Meal) {
    const itemIndex = this.items.findIndex((item) => item.id === meal.id);

    this.items[itemIndex] = meal;
  }

  async delete(meal: Meal) {
    const itemIndex = this.items.findIndex((item) => item.id === meal.id);

    this.items.splice(itemIndex, 1);
  }

  async countByUserId(userId: string) {
    return this.items.filter((meal) => meal.userId.toString() === userId)
      .length;
  }

  async countTrueBooleans(userId: string) {
    const meals = this.items.filter(
      (meal) => meal.userId.toString() === userId,
    );

    return meals.filter((meal) => meal.isOnTheDiet === true).length;
  }

  async countFalseBooleans(userId: string) {
    const meals = this.items.filter(
      (meal) => meal.userId.toString() === userId,
    );

    return meals.filter((meal) => meal.isOnTheDiet === false).length;
  }

  async countSequenceOfTrueBooleans(userId: string): Promise<number> {
    const meals = this.items.filter(
      (meal) => meal.userId.toString() === userId,
    );

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
