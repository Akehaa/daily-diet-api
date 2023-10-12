import { GetSpecificMealUseCase } from '@/domain/diet/application/use-cases/get-specific-meal';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { MealPresenter } from '../presenters/meal-presenter';

@Controller('/meals/:mealId')
export class GetSpecificMealController {
  constructor(private getSpecificMeal: GetSpecificMealUseCase) {}

  @Get()
  async handle(@Param('mealId') mealId: string) {
    const result = await this.getSpecificMeal.execute({
      mealId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { meal: MealPresenter.toHTTp(result.value.meal) };
  }
}
