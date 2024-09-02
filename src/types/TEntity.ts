import { TComponent } from './TComponent';
import {TSystem} from "./TSystem";

type TEntity = {
  name: string;
  components: TComponent[];
  systems: TSystem[];
};

export type { TEntity };
