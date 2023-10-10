import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { EditMealUseCase } from '@/domain/diet/application/use-cases/edit-meal';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user-decorator';

const editMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  hour: z.string(),
  isOnTheDiet: z.boolean(),
});

const bodyValidationPipe = new ZodValidationPipe(editMealBodySchema);

type EditMealBodySchema = z.infer<typeof editMealBodySchema>;

@Controller('/meals/:id')
export class EditMealController {
  constructor(private editMeal: EditMealUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditMealBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') mealId: string,
  ) {
    const { name, description, date, hour, isOnTheDiet } = body;
    const userId = user.sub;

    const result = await this.editMeal.execute({
      userId: userId,
      mealId,
      name,
      description,
      date,
      hour,
      isOnTheDiet,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
