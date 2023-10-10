import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { MealFactory } from 'test/factories/make-meal';
import { UserFactory } from 'test/factories/make-user';
import request from 'supertest';

describe('Edit Meal (E2E)', () => {
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

  test('[PUT] /meals/:id', async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const meal = await mealFactory.makePrismaMeal({
      userId: user.id,
    });

    const mealId = meal.id.toString();

    const response = await request(app.getHttpServer())
      .put(`/meals/${mealId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Edit Meal',
        description: 'Edit Description',
        date: '2024-01-01',
        hour: '14:00:00',
        isOnTheDiet: true,
      });

    expect(response.statusCode).toBe(204);

    const mealOnDatabase = await prisma.meal.findFirst({
      where: {
        name: 'Edit Meal',
        description: 'Edit Description',
      },
    });

    expect(mealOnDatabase).toBeTruthy();
  });
});
