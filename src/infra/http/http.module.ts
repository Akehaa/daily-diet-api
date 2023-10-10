import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { RegisterUseCase } from '@/domain/diet/application/use-cases/register';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateUserUseCase } from '@/domain/diet/application/use-cases/authenticate-user';
import { CreateMealController } from './controllers/create-meal.controller';
import { CreateMealUseCase } from '@/domain/diet/application/use-cases/create-meal';
import { EditMealController } from './controllers/edit-meal.controller';
import { EditMealUseCase } from '@/domain/diet/application/use-cases/edit-meal';
import { DeleteMealController } from './controllers/delete-meal.controller';
import { DeleteMealUseCase } from '@/domain/diet/application/use-cases/delete-meal';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateMealController,
    EditMealController,
    DeleteMealController,
  ],
  providers: [
    RegisterUseCase,
    AuthenticateUserUseCase,
    CreateMealUseCase,
    EditMealUseCase,
    DeleteMealUseCase,
  ],
})
export class HttpModule {}
