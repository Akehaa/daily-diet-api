import { Either, right } from '@/core/either';
import { MealsRepository } from '@/domain/diet/application/repositories/meals-repository';
import { Injectable } from '@nestjs/common';
import { Meal } from '../../enterprise/entities/meal';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface CreateMealUseCaseRequest {
  userId: string;
  name: string;
  description: string;
  date: string;
  hour: string;
  isOnTheDiet: boolean;
}

type CreateMealUseCaseResponse = Either<null, { meal: Meal }>;

@Injectable()
export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    name,
    description,
    date,
    hour,
    isOnTheDiet,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = Meal.create({
      userId: new UniqueEntityId(userId),
      name,
      description,
      date,
      hour,
      isOnTheDiet,
    });

    await this.mealsRepository.create(meal);

    return right({
      meal,
    });
  }
}
