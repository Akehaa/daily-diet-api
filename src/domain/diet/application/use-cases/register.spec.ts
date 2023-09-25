import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from 'test/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it('should be able to register', async () => {
    const result = await sut.execute({
      name: 'dener',
      email: 'dener@test.com',
      password: '123456',
    });

    expect(inMemoryUsersRepository.items[0]).toEqual(result.value.user);
  });
});
