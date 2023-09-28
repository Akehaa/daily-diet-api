import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface MealProps {
  name: string;
  description: string;
  date: string;
  hour: string;
  isOnTheDiet: boolean;
}

export class Meal extends Entity<MealProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get date() {
    return this.props.date;
  }

  get hour() {
    return this.props.hour;
  }

  get isOnTheDiet() {
    return this.props.isOnTheDiet;
  }

  static create(props: MealProps, id?: UniqueEntityId) {
    const meal = new Meal(props, id);

    return meal;
  }
}
