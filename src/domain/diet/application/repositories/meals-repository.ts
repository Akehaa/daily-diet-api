import { Meal } from '../../enterprise/entities/meal';

export abstract class MealsRepository {
  abstract create(meal: Meal): Promise<void>;
  abstract findById(id: string): Promise<Meal | null>;
  abstract save(meal: Meal): Promise<void>;
  abstract delete(meal: Meal): Promise<void>;
  abstract findManyById(userId: string): Promise<Meal[]>;
  abstract countByUserId(userId: string): Promise<number>;
  abstract countTrueBooleans(userId: string): Promise<number>;
  abstract countFalseBooleans(userId: string): Promise<number>;
  abstract countSequenceOfTrueBooleans(userId: string): Promise<number>;
}
