import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { MealFactory } from 'test/factories/make-meal';
import { UserFactory } from 'test/factories/make-user';
import request from 'supertest';

describe('Delete Meal (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let mealFactory: MealFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, MealFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    userFactory = moduleRef.get(UserFactory);
    mealFactory = moduleRef.get(MealFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[DELETE] /meals/:id', async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const meal = await mealFactory.makePrismaMeal({
      userId: user.id,
    });

    const mealId = meal.id.toString();

    const response = await request(app.getHttpServer())
      .delete(`/meals/${mealId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);

    const mealOnDatabase = await prisma.meal.findUnique({
      where: {
        id: mealId,
      },
    });

    expect(mealOnDatabase).toBeNull();
  });
});
