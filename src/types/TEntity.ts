import type { TComponent } from './TComponent';
import type { TSystem } from './TSystem';

type TEntity = {
  name: string;
  components: TComponent[];
  systems: TSystem[];
};

export type { TEntity };
