import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

interface UserProps {
  name: string;
  email: string;
  password_hash: string;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password_hash() {
    return this.props.password_hash;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);

    return user;
  }
}
