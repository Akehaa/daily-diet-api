import { Meal } from '@/domain/diet/enterprise/entities/meal';

export class MealPresenter {
  static toHTTp(meal: Meal) {
    return {
      id: meal.id.toString(),
      name: meal.name,
      description: meal.description,
      date: meal.date,
      hour: meal.hour,
      isOnTheDiet: meal.isOnTheDiet,
    };
  }
}
