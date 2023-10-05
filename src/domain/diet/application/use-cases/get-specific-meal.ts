import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Meal } from '../../enterprise/entities/meal';
import { MealsRepository } from '../repositories/meals-repository';
import { Injectable } from '@nestjs/common';

interface GetSpecificMealUseCaseRequest {
  mealId: string;
}

type GetSpecificMealUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    meal: Meal;
  }
>;

@Injectable()
export class GetSpecificMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
  }: GetSpecificMealUseCaseRequest): Promise<GetSpecificMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId);

    if (!meal) {
      return left(new ResourceNotFoundError());
    }

    return right({
      meal,
    });
  }
}
