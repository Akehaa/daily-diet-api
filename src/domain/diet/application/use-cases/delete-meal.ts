import { Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { MealsRepository } from '../repositories/meals-repository';
import { Injectable } from '@nestjs/common';

interface DeleteMealUseCaseRequest {
  mealId: string;
  userId: string;
}

type DeleteMealUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>;

@Injectable()
export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
  }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId);

    if (!meal) {
      return left(new ResourceNotFoundError());
    }

    if (userId !== meal.userId.toString()) {
      return left(new NotAllowedError());
    }

    await this.mealsRepository.delete(meal);

    return right({});
  }
}
