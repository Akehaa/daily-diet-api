import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from 'test/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { compare } from 'bcryptjs';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it('should be able to register', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    });
    expect(inMemoryUsersRepository.items[0].email).toEqual(
      'johndoe@example.com',
    );
  });

  it('should hash user password upon registration', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      inMemoryUsersRepository.items[0].password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with the same email', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    const result = await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
