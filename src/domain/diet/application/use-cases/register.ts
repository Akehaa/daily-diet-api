import { Either, right } from '@/core/types/either';
import { User } from '../../enterprise/entities/user';
import { UsersRepository } from '../repositories/users-repository';
interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterUseCaseResponse = Either<
  null,
  {
    user: User;
  }
>;

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

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
