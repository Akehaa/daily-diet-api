import { MealsRepository } from '@/domain/diet/application/repositories/meals-repository';
import { Either, right } from '@/core/either';
import { Meal } from '../../enterprise/entities/meal';
import { Injectable } from '@nestjs/common';

interface FetchUserMealsUseCaseRequest {
  userId: string;
}

type FetchUserMealsUseCaseResponse = Either<
  null,
  {
    meals: Meal[];
  }
>;

@Injectable()
export class FetchUserMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchUserMealsUseCaseRequest): Promise<FetchUserMealsUseCaseResponse> {
    const meals = await this.mealsRepository.findManyById(userId);

    return right({
      meals,
    });
  }
}
