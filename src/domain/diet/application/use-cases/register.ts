import { Either, left, right } from '@/core/types/either';
import { User } from '../../enterprise/entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { Injectable } from '@nestjs/common';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const user = User.create({
      name,
      email,
      password,
    });

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
