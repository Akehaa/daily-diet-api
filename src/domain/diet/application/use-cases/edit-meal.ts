import { Either, left, right } from '@/core/either';
import { MealsRepository } from '../repositories/meals-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { Meal } from '../../enterprise/entities/meal';
import { Injectable } from '@nestjs/common';

interface EditMealUseCaseRequest {
  userId: string;
  mealId: string;
  name: string;
  description: string;
  date: string;
  hour: string;
  isOnTheDiet: boolean;
}

type EditMealUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    meal: Meal;
  }
>;

@Injectable()
export class EditMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    mealId,
    name,
    description,
    date,
    hour,
    isOnTheDiet,
  }: EditMealUseCaseRequest): Promise<EditMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId);

    if (!meal) {
      return left(new ResourceNotFoundError());
    }

    if (userId !== meal.userId.toString()) {
      return left(new NotAllowedError());
    }

    meal.name = name;
    meal.description = description;
    meal.date = date;
    meal.hour = hour;
    meal.isOnTheDiet = isOnTheDiet;

    await this.mealsRepository.save(meal);

    return right({
      meal,
    });
  }
}
