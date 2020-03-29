import { Film } from 'src/app/interfaces';
export interface Character {
  name: string;
  eye_color: string;
  gender: string;
  films: any[]; // string[] | Film[];
}
