import { Either, left, right } from '@/core/either';
import { MealsRepository } from '../repositories/meals-repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { Injectable } from '@nestjs/common';

interface getUserMetricsUseCaseRequest {
  userId: string;
}

type getUserMetricsUseCaseResponse = Either<
  NotAllowedError,
  {
    totalMeals: number;
    totalMealsOnDiet: number;
    totalMealsOutDiet: number;
    bestSequenceOfMeals: number;
  }
>;

@Injectable()
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

    if (!totalMeals) {
      return left(new NotAllowedError());
    }

    return right({
      totalMeals,
      totalMealsOnDiet,
      totalMealsOutDiet,
      bestSequenceOfMeals,
    });
  }
}
