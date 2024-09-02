import type { TComponent, TSystem, TEntity } from 'types';

import {
  clone,
  findAllByNameFast,
  findAllByTypeArrayFast,
  findByNameFast,
  findByTypeFast,
  hasNameFast,
  hasTypeFast,
  removeNameFast,
  removeTypeFast,
} from './utils';

const components: TComponent[] = [];
const systems: TSystem[] = []
const entities: TEntity[] = [];

const addEntity = (entity: TEntity) => entities.push(entity);
const addComponent = (component: TComponent) => components.push(component);
const addSystem = (system: TSystem) => systems.push(system);

const createEntity = (name: string, componentTypes: string[], systemNames: string[]): TEntity => {
  const outComponents: TComponent[] = [];
  const outSystems: TSystem[] = [];

  const cCount = componentTypes.length;
  for (let i = 0; i < cCount; i++) {
    const component = findComponentByName(componentTypes[i]);
    if (component == null) continue;

    const clonedComponent = clone(component);
    if (clonedComponent.onAdd != null) {
      clonedComponent.onAdd();
    }

    outComponents.push(clonedComponent);
  }

  const sCount = systemNames.length;
  for (let i = 0; i < sCount; i++) {
    const system = findSystemByName(systemNames[i]);
    if (system == null) continue;

    outSystems.push(system);
  }

  return {
    name,
    components: outComponents,
    systems: outSystems,
  };
};

const findComponentByName = (name: string) => findByNameFast(components, name);
const findComponentByType = (type: string) => findByTypeFast(components, type);
const findSystemByName = (name: string) => findByNameFast(systems, name);
const findEntityByName = (name: string) => findByNameFast(entities, name);

const getComponents = () => components;
const getSystems = () => systems;
const getEntities = () => entities;

const getEntitiesByName = (name: string) => findAllByNameFast(entities, name);
const getEntityComponents = (entity: TEntity, componentTypes: string[]) =>
  findAllByTypeArrayFast(entity.components, componentTypes);

const isEntityHasComponent = (entity: TEntity, componentType: string) =>
  hasTypeFast(entity.components, componentType);
const isEntityHasSystem = (entity: TEntity, systemName: string) =>
  hasNameFast(entity.systems, systemName);

const removeComponentFromEntity = (entity: TEntity, componentName: string) =>
  removeTypeFast(entity.components, componentName);
const removeSystemFromEntity = (entity: TEntity, systemName: string) =>
  removeNameFast(entity.systems, systemName);

const removeEntity = (entity: TEntity) => removeNameFast(entities, entity.name);
const removeAllEntities = () => {
  entities.length = 0
};

const getEntitiesFromComponentTypes = (componentTypes: string[]) => {
  const outEntities: TEntity[] = [];
  const count = entities.length;
  const typesCount = componentTypes.length;

  for (let i = 0; i < count; i++) {
    const entity = entities[i];

    let hasAll = true;
    for (let j = 0; j < typesCount; j++) {
      const type = componentTypes[j];
      if (!isEntityHasComponent(entity, type)) {
        hasAll = false;
        break;
      }
    }

    if (hasAll) outEntities.push(entity);
  }

  return outEntities;
};

const processAllSystems = () => {
  const count = systems.length;
  for (let i = 0; i < count; i++) {
    const system = systems[i];
    const systemEntities = getEntitiesFromComponentTypes(system.dependencies);
    const systemEntityCount = systemEntities.length;

    for (let j = 0; j < systemEntityCount; j++) {
      const entity = systemEntities[j];
      const hasSystem = isEntityHasSystem(entity, system.name);

      if (hasSystem) {
        const entityComponents = getEntityComponents(entity, system.dependencies);
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

  findComponentByName,
  findSystemByName,
  findEntityByName,

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
