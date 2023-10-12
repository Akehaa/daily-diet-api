import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { MealFactory } from 'test/factories/make-meal';
import { UserFactory } from 'test/factories/make-user';
import request from 'supertest';

describe('Edit Meal (E2E)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let mealFactory: MealFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, MealFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory);
    mealFactory = moduleRef.get(MealFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /meals/:mealId', async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const meal = await mealFactory.makePrismaMeal({
      userId: user.id,
      name: 'Meal 01',
    });

    const mealId = meal.id.toString();

    const response = await request(app.getHttpServer())
      .get(`/meals/${mealId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      meal: expect.objectContaining({ name: 'Meal 01' }),
    });
  });
});
