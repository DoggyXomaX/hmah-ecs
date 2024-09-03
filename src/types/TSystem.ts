import type { TEntity } from './TEntity';
import type { TComponent } from './TComponent';

type TSystem = {
  name: string;
  required: string[];
  process(entity: TEntity, components: TComponent[], system: TSystem): void
};

export type { TSystem };
