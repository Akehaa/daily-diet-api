import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@/domain/diet/application/repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma-users-repository';
import { MealsRepository } from '@/domain/diet/application/repositories/meals-repository';
import { PrismaMealsRepository } from './repositories/prisma-meals-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: MealsRepository,
      useClass: PrismaMealsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, MealsRepository],
})
export class DatabaseModule {}
