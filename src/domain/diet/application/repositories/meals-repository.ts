import { Meal } from '../../enterprise/entities/meal';

export abstract class MealsRepository {
  abstract create(meal: Meal): Promise<void>;
}
