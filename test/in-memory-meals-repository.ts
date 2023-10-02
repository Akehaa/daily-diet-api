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
}
