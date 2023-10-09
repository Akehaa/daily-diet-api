import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { UserFactory } from 'test/factories/make-user';

describe('Create Question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userFactory: UserFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    userFactory = moduleRef.get(UserFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /meals', async () => {
    const user = await userFactory.makePrismaUser();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/meals')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'New Meal',
        description: 'New Description',
        date: '2024-01-01',
        hour: '14:00:00',
        isOnTheDiet: true,
      });

    expect(response.statusCode).toBe(201);

    const mealOnDatabase = await prisma.meal.findFirst({
      where: {
        name: 'New Meal',
      },
    });

    expect(mealOnDatabase).toBeTruthy();
  });
});
