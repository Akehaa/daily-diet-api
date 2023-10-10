import { DeleteMealUseCase } from '@/domain/diet/application/use-cases/delete-meal';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  Controller,
  Delete,
  HttpCode,
  Param,
  BadRequestException,
} from '@nestjs/common';

@Controller('/meals/:id')
export class DeleteMealController {
  constructor(private deleteMeal: DeleteMealUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') mealId: string) {
    const userId = user.sub;

    const result = await this.deleteMeal.execute({
      mealId,
      userId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
