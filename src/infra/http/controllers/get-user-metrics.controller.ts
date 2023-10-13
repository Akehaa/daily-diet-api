import { GetUserMetricsUseCase } from '@/domain/diet/application/use-cases/get-user-metrics';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';

@Controller('/user/:userId')
export class GetUserMetricsController {
  constructor(private getUserMetrics: GetUserMetricsUseCase) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    const result = await this.getUserMetrics.execute({
      userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return result.value;
  }
}
