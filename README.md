# hmah-ecs

Attempt to build ECS in TypeScript.

[Original code](https://github.com/Stuhl/javascript-entity-component-system/blob/master/src/index.ts)

## API

### Types
```ts
type TComponent = {
  name: string;
  type: string;
  data: Record<string, any>; // Is this safe?
  onAdd?: () => void;
};

type TEntity = {
  name: string;
  components: TComponent[];
  systems: TSystem[];
};

type TSystem = {
  name: string;
  dependencies: string[];
  process(entity: TEntity, components: TComponent[], system: TSystem): void
};
```

### ECS API

```ts
// Add entity to the ECS
import {TComponent} from "./TComponent";

function addEntity(entity: TEntity): void

// Add component to the ECS
function addComponent(component: TComponent): void

// Add system to the ECS
function addSystem(system: TSystem): void

// Create entity with provided name, types of components and system names
function createEntity(name: string, componentTypes: string[], systemNames: string[]): TEntity

// Find by name or type
function findComponentByName(name: string): TComponent | undefined
function findComponentByType(type: string): TComponent | undefined
function findSystemByName(name: string): TSystem | undefined
function findEntityByName(name: string): TEntity | undefined

// Just getters
function getComponents(void): TComponent[]
function getSystems(void): TSystem[]
function getEntities(void): TEntity[]

// Get all entities by name
function getEntitiesByName(name: string): TEntity[]

// Get all entity components with provided componentTypes
function getEntityComponents(entity: TEntity, componentTypes: string[]): TComponent

// Is entity has something
function isEntityHasComponent(entity: TEntity, componentType: string): boolean
function isEntityHasSystem(entity: TEntity, systemName: string): boolean

// Remove something from entity
function removeComponentFromEntity(entity: TEntity, componentName: string): void
function removeSystemFromEntity(entity: TEntity, systemName: string): void

// Remove entity from ECS
function removeEntity(entity: TEntity): void

// Remove all entities from ECS
function removeAllEntities(void): void

// Process all systems in ECS (like game loop on windowRequestAnimationFrame or setInterval/setTimeout)
function processAllSystems(void): void
```

## Examples

I don't know how to use it btw

## Build
```shell
npm run build
```

## License
Super MIT boy