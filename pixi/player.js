import { controls } from './controls.js';
import { createBullet } from './bullets.js';

let container = null;
let position = 0.0;

const shoot = (app) => {
  const bullet = createBullet(container.x, container.y - 30);
  app.stage.addChild(bullet);
}

export const createPlayer = (spritesheet, x, y) => {
  container = new PIXI.Container();
  const sprite = PIXI.Sprite.from('assets/player.png');
  const fire = new PIXI.AnimatedSprite(spritesheet.animations.fire);

  sprite.anchor.set(0.5);
  sprite.scale.set(0.3);
  container.addChild(sprite);
  
  fire.y = 45;
  fire.x = 2;
  fire.scale.set(.2);
  fire.rotation = Math.PI / 2;
  fire.anchor.set(0.5);
  fire.animationSpeed = 0.1666;
  fire.play();
  container.addChild(fire);

  container.x = x
  container.y = y;
  position = x;

  return container;
}

export const updatePlayer = (app, elapsed) => {
  if (controls.shoot) {
    shoot(app);
    controls.shoot = false;
  }
  if (controls.left) {
    controls.x = position - 50;
  }
  if (controls.right) {
    controls.x = position + 50;
  }
  if (controls.x) {
    position += (controls.x - position) / 20;
  }
  
  if (position < 0) position = 0;
  if (position > app.renderer.width) position = app.renderer.width;
  container.x = position + Math.cos(elapsed/50.0) * 10.0;
  // container.y = 400 + Math.cos(elapsed/50.0) * 10.0;
}