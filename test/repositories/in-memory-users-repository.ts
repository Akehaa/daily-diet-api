import { UsersRepository } from '@/domain/diet/application/repositories/users-repository';
import { User } from '@/domain/diet/enterprise/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User) {
    this.items.push(user);
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
