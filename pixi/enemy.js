import { intersectBullets } from './bullets.js';

const enemies = [];
const speed = 1;
const hitArea = new PIXI.Rectangle(43, 20, 20, 40);

const template = new PIXI.Graphics();
template.beginFill(0xFF9000);
template.drawRect(0, 0, hitArea.width, hitArea.height);
template.endFill();

export const createEnemy = (spritesheet, x, y) => {
  const enemy = enemies.find(enemy => !enemy.visible);
  if (enemy) {
    enemy.visible = true;
    enemy.x = x;
    enemy.y = y;
    return enemy;
  }

  const container = new PIXI.Container();
  const sprite = new PIXI.AnimatedSprite(spritesheet.animations.ship_xs);
  container.addChild(sprite);
  
  sprite.scale.set(0.7);
  sprite.rotation = Math.PI;
  sprite.anchor.set(0.5);
  sprite.animationSpeed = 0.2;
  sprite.play();
  container.addChild(sprite);

  container.x = x
  container.y = y;

  // const c = new PIXI.Graphics(template.geometry);
  // c.x = hitArea.x;
  // c.y = hitArea.y;
  // container.addChild(c);
  enemies.push(container);
  return container;
}

export const createEnemyGroup = (spritesheet, x, y) => {
  const container = new PIXI.Container();
  container.addChild(createEnemy(spritesheet, x - 100, y));
  container.addChild(createEnemy(spritesheet, x, y));
  container.addChild(createEnemy(spritesheet, x + 100, y));
  return container;
}

export const updateEnemies = (app, elapsed, delta) => {
  enemies.filter(enemy => enemy.visible).forEach(container => {
    if (!container) return;
    container.y += speed * delta;
    container.x = container.x + Math.cos(elapsed/50.0) * 1.0;
    
    const rect = new PIXI.Rectangle(container.x + hitArea.x, container.y + hitArea.y, hitArea.width, hitArea.height);
    const intersectBullet = intersectBullets(rect);
    if (intersectBullet) {
      container.visible = false;
      intersectBullet.visible = false;
    }
  })
}