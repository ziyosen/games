const bullets = [];
const speed = 10;

const template = new PIXI.Graphics();
template.beginFill(0xFF9000);
template.drawCircle(0, 0, 3);
template.endFill();

export const createBullet = (x, y) => {
  const bullet = bullets.find(bullet => !bullet.visible);
  if (bullet) {
    bullet.visible = true;
    bullet.x = x;
    bullet.y = y;
    return bullet;
  }

  const container = new PIXI.Graphics(template.geometry);
  container.x = x;
  container.y = y;
  bullets.push(container);
  return container;
}

export const updateBullets = (app, elapsed, delta) => {
  bullets.filter(bullet => bullet.visible).forEach((bullet) => {
    bullet.y -= speed * delta;
    
    if (bullet.y < 0) {
      bullet.visible = false;
    }
  })
}

export const intersectBullets = (rect) => {
  const activeBullets = bullets.filter(bullet => bullet.visible);
  for (let i = 0; i < activeBullets.length; i++) {
    if (rect.intersects(activeBullets[i].getBounds())) {
      return activeBullets[i];
    }
  }
}