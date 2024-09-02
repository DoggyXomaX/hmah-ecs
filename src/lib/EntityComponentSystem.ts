import { TComponent } from 'types/TComponent';
import { TSystem } from 'types/TSystem';
import { TEntity } from 'types/TEntity';
import {clone, findAllFast, findFast, findAllArrayFast, hasFast, removeFast} from './utils';

const components: TComponent[] = [];
const systems: TSystem[] = []
const entities: TEntity[] = [];

const addEntity = (entity: TEntity) => entities.push(entity);
const addComponent = (component: TComponent) => components.push(component);
const addSystem = (system: TSystem) => systems.push(system);

const addComponentToEntity = (entity: TEntity, componentName: string) => {
  const component = findComponent(componentName);
  if (component) entity.components.push(component);
};
const addSystemToEntity = (entity: TEntity, systemName: string) => {
  const system = findSystem(systemName);
  if (system) entity.systems.push(system);
};

const createEntity = (name: string, componentNames: string[], systemNames: string[]): TEntity => {
  const outComponents: TComponent[] = [];
  const outSystems: TSystem[] = [];

  const cCount = componentNames.length;
  for (let i = 0; i < cCount; i++) {
    const component = findComponent(componentNames[i]);
    if (component == null) continue;

    const clonedComponent = clone(component);
    if (clonedComponent.onAdd != null) {
      clonedComponent.onAdd();
    }

    outComponents.push(clonedComponent);
  }

  const sCount = systemNames.length;
  for (let i = 0; i < sCount; i++) {
    const system = findSystem(systemNames[i]);
    if (system == null) continue;

    outSystems.push(system);
  }

  return {
    name,
    components: outComponents,
    systems: outSystems,
  };
};

const findComponent = (name: string) => findFast(components, name);
const findSystem = (name: string) => findFast(systems, name);
const findEntity = (name: string) => findFast(entities, name);

const getComponents = () => components;
const getSystems = () => systems;
const getEntities = () => entities;

const getEntitiesByName = (name: string) => findAllFast(entities, name);
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

const removeEntity = (entity: TEntity) => removeFast(entities, entity.name);
const removeAllEntities = () => {
  entities.length = 0
};

const getEntitiesFromComponentNames = (componentNames: string[]) => {
  const outEntities: TEntity[] = [];
  const count = entities.length;
  const namesCount = componentNames.length;

  for (let i = 0; i < count; i++) {
    const entity = entities[i];

    let hasAll = true;
    for (let j = 0; j < namesCount; j++) {
      const name = componentNames[j];
      if (!isEntityHasComponent(entity, name)) {
        hasAll = false;
        break;
      }
    }

    if (hasAll) outEntities.push(entity);
  }

  return outEntities;
};

const runSystems = () => {
  const count = systems.length;
  for (let i = 0; i < count; i++) {
    const system = systems[i];
    const systemEntities = getEntitiesFromComponentNames(system.dependencies);
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

  addComponentToEntity,
  addSystemToEntity,

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

  runSystems,
};