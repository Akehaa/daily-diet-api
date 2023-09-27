import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    const user = new User(props, id);

    return user;
  }
}
