import { Menuimage } from 'src/app/model/menuimage';
import { Menudishmenuingredient } from './menudishmenuingredient';

export class MenuDish {
  rnd!: string;
  name!: string;
  description!: string;
  allergies!: string;
  images!: Menuimage[];
  ingredients!: Menudishmenuingredient[];
  price!: number;
}
