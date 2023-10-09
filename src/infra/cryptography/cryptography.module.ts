import { Module } from '@nestjs/common';

import { BcryptHasher } from './bcrypt-hasher';
import { HashComparer } from '@/domain/diet/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/diet/application/cryptography/hash-generator';
import { Encrypter } from '@/domain/diet/application/cryptography/encrypter';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
