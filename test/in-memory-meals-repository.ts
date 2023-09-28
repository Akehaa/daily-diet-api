import { MealsRepository } from '@/domain/diet/application/repositories/meals-repository';
import { Meal } from '@/domain/diet/enterprise/entities/meal';

export class InMemoryMealsRepository extends MealsRepository {
  public items: Meal[] = [];

  async create(meal: Meal) {
    this.items.push(meal);
  }
}
