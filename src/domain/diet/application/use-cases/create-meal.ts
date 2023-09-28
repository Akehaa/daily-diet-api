import { Either, right } from '@/core/types/either';
import { MealsRepository } from '@/domain/diet/application/repositories/meals-repository';
import { Injectable } from '@nestjs/common';
import { Meal } from '../../enterprise/entities/meal';

interface CreateMealUseCaseRequest {
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
    name,
    description,
    date,
    hour,
    isOnTheDiet,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = Meal.create({
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
