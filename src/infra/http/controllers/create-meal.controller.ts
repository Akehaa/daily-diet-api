import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { CreateMealUseCase } from '@/domain/diet/application/use-cases/create-meal';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  hour: z.string(),
  isOnTheDiet: z.boolean(),
});

const bodyValidationPipe = new ZodValidationPipe(createMealBodySchema);

type CreateMealBodySchema = z.infer<typeof createMealBodySchema>;

@Controller('/meals')
@UseGuards(JwtAuthGuard)
export class CreateMealController {
  constructor(private createMeal: CreateMealUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateMealBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, description, date, hour, isOnTheDiet } = body;
    const userId = user.sub;

    const result = await this.createMeal.execute({
      userId: userId,
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
