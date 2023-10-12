import { FetchUserMealsUseCase } from '@/domain/diet/application/use-cases/fetch-user-meals';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { MealPresenter } from '../presenters/meal-presenter';

@Controller('/user/meals/:userId')
export class FetchUserMealsController {
  constructor(private fetchUserMeals: FetchUserMealsUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const result = await this.fetchUserMeals.execute({
      userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const userMeals = result.value.meals;

    return { meals: userMeals.map(MealPresenter.toHTTp) };
  }
}
