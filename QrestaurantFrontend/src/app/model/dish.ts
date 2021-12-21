import { Image } from 'src/app/model/image';
import { Dishingredient } from './dishingredient';

export class Dish {
  id!: number;
  name!: string;
  description!: string;
  allergies!: string;
  images!: Image[];
  ingredients!: Dishingredient[];
  ingredientPrice!: number;
  price!: number;
}
