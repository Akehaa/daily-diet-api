import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface MealProps {
  userId: UniqueEntityId;
  name: string;
  description: string;
  date: string;
  hour: string;
  isOnTheDiet: boolean;
  createdAt: Date;
}

export class Meal extends Entity<MealProps> {
  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get date() {
    return this.props.date;
  }

  set date(date: string) {
    this.props.date = date;
  }

  get hour() {
    return this.props.hour;
  }

  set hour(hour: string) {
    this.props.hour = hour;
  }

  get isOnTheDiet() {
    return this.props.isOnTheDiet;
  }

  set isOnTheDiet(isOnTheDiet: boolean) {
    this.props.isOnTheDiet = isOnTheDiet;
  }

  static create(props: Optional<MealProps, 'createdAt'>, id?: UniqueEntityId) {
    const meal = new Meal(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return meal;
  }
}
