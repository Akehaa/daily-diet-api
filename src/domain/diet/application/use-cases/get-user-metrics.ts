import { Either, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { MealsRepository } from '../repositories/meals-repository';

interface getUserMetricsUseCaseRequest {
  userId: string;
}

type getUserMetricsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    totalMeals: number;
    totalMealsOnDiet: number;
    totalMealsOutDiet: number;
    bestSequenceOfMeals: number;
  }
>;

export class GetUserMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: getUserMetricsUseCaseRequest): Promise<getUserMetricsUseCaseResponse> {
    const totalMeals = await this.mealsRepository.countByUserId(userId);

    const totalMealsOnDiet =
      await this.mealsRepository.countTrueBooleans(userId);

    const totalMealsOutDiet =
      await this.mealsRepository.countFalseBooleans(userId);

    const bestSequenceOfMeals =
      await this.mealsRepository.countSequenceOfTrueBooleans(userId);

    return right({
      totalMeals,
      totalMealsOnDiet,
      totalMealsOutDiet,
      bestSequenceOfMeals,
    });
  }
}
