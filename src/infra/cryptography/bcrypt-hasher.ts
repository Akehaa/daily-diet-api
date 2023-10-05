import { HashComparer } from '@/domain/diet/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/diet/application/cryptography/hash-generator';
import { hash, compare } from 'bcryptjs';

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 9;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
