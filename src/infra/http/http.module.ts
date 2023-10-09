import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { RegisterUseCase } from '@/domain/diet/application/use-cases/register';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateUserUseCase } from '@/domain/diet/application/use-cases/authenticate-user';
import { CreateMealController } from './controllers/create-meal.controller';
import { CreateMealUseCase } from '@/domain/diet/application/use-cases/create-meal';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateMealController,
  ],
  providers: [RegisterUseCase, AuthenticateUserUseCase, CreateMealUseCase],
})
export class HttpModule {}
