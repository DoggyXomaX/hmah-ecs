import type { TEntity, TComponent, TSystem } from 'types';

import { addComponent, addEntity, addSystem, getEntityComponents, processAllSystems, createEntity } from 'lib/ECS';

const canvas = document.querySelector<HTMLCanvasElement>('.viewport');
if (!canvas) {
  throw Error('Viewport was not found in document!');
}

canvas.width = 800;
canvas.height = 600;

const context = canvas.getContext('2d');
if (!context) {
  throw Error('Failed to create CanvasRenderingContext2D!');
}

context.fillRect(0, 0, canvas.width, canvas.height);

addComponent({
  name: 'positionComp',
  data: { x: 0, y: 0 },
});

addComponent({
  name: 'radiusComp',
  data: { radius: 7 },
});

addComponent({
  name: 'colorComp',
  data: { color: [255, 0, 0, 255] },
});

addSystem({
  name: 'renderSystem',
  required: ['positionComp', 'radiusComp', 'colorComp'],
  process(entity: TEntity, components: TComponent[], system: TSystem) {
    const [positionComp, radiusComp, colorComp] = getEntityComponents(entity, ['positionComp', 'radiusComp', 'colorComp']);
    context.fillStyle = `rgba(${colorComp.data.color.join(',')})`;
    context.beginPath();
    context.arc(positionComp.data.x, positionComp.data.y, radiusComp.data.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  },
});

addSystem({
  name: 'gravitySystem',
  required: ['positionComp'],
  process(entity: TEntity, components: TComponent[], system: TSystem) {
    const [positionComp] = getEntityComponents(entity, ['positionComp']);
    positionComp.data.y += 0.5;
  },
})

const entity = createEntity(
  'point1',
  ['positionComp', 'radiusComp', 'colorComp'],
  ['renderSystem', 'gravitySystem'],
);

entity.components[0].data.x = 100;
entity.components[0].data.y = 100;

addEntity(entity);

const gameLoop = () => {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  processAllSystems();

  requestAnimationFrame(gameLoop);
};

gameLoop();

// TODO: bitECS or ECS in github
