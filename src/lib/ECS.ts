import type { TComponent, TSystem, TEntity } from 'types';

import { clone, findAllFast, findFast, hasFast, removeFast, findAllArrayFast } from './utils';

const _components: TComponent[] = [];
const _systems: TSystem[] = []
const _entities: TEntity[] = [];

const addEntity = (entity: TEntity) => _entities.push(entity);
const addComponent = (component: TComponent) => _components.push(component);
const addSystem = (system: TSystem) => _systems.push(system);

const createEntity = (name: string, componentNames: string[], systemNames: string[]): TEntity => {
  const components: TComponent[] = [];
  const systems: TSystem[] = [];

  const cCount = componentNames.length;
  for (let i = 0; i < cCount; i++) {
    const component = findComponent(componentNames[i]);
    if (component == null) continue;

    const clonedComponent = clone(component);
    if (clonedComponent.onAdd != null) {
      clonedComponent.onAdd();
    }

    components.push(clonedComponent);
  }

  const sCount = systemNames.length;
  for (let i = 0; i < sCount; i++) {
    const system = findSystem(systemNames[i]);
    if (system == null) continue;

    systems.push(system);
  }

  return {
    name,
    components: components,
    systems: systems,
  };
};

const findComponent = (name: string) => findFast(_components, name);
const findSystem = (name: string) => findFast(_systems, name);
const findEntity = (name: string) => findFast(_entities, name);

const getComponents = () => _components;
const getSystems = () => _systems;
const getEntities = () => _entities;

const getEntitiesByName = (name: string) => findAllFast(_entities, name);
const getEntityComponents = (entity: TEntity, componentNames: string[]) =>
  findAllArrayFast(entity.components, componentNames);

const isEntityHasComponent = (entity: TEntity, componentName: string) =>
  hasFast(entity.components, componentName);
const isEntityHasSystem = (entity: TEntity, systemName: string) =>
  hasFast(entity.systems, systemName);

const removeComponentFromEntity = (entity: TEntity, componentName: string) =>
  removeFast(entity.components, componentName);
const removeSystemFromEntity = (entity: TEntity, systemName: string) =>
  removeFast(entity.systems, systemName);

const removeEntity = (entity: TEntity) => removeFast(_entities, entity.name);
const removeAllEntities = () => {
  _entities.length = 0
};

const getRequiredEntities = (componentName: string[]) => {
  const outEntities: TEntity[] = [];
  const count = _entities.length;
  const namesCount = componentName.length;

  for (let i = 0; i < count; i++) {
    const entity = _entities[i];

    let hasAll = true;
    for (let j = 0; j < namesCount; j++) {
      const name = componentName[j];
      if (!isEntityHasComponent(entity, name)) {
        hasAll = false;
        break;
      }
    }

    if (hasAll) outEntities.push(entity);
  }

  return outEntities;
};

const processAllSystems = () => {
  const count = _systems.length;
  for (let i = 0; i < count; i++) {
    const system = _systems[i];
    const systemEntities = getRequiredEntities(system.required);
    const systemEntityCount = systemEntities.length;

    for (let j = 0; j < systemEntityCount; j++) {
      const entity = systemEntities[j];
      const hasSystem = isEntityHasSystem(entity, system.name);

      if (hasSystem) {
        const entityComponents = getEntityComponents(entity, system.required);
        system.process(entity, entityComponents, system);
      }
    }
  }
};

export {
  addEntity,
  addComponent,
  addSystem,

  createEntity,

  findComponent,
  findSystem,
  findEntity,

  getComponents,
  getSystems,
  getEntities,

  getEntitiesByName,
  getEntityComponents,

  isEntityHasComponent,
  isEntityHasSystem,

  removeComponentFromEntity,
  removeSystemFromEntity,
  removeEntity,
  removeAllEntities,

  processAllSystems,
};
