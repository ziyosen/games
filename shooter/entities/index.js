import Vector from '../vector.js';

export * from './boundary.js';
export * from './ray.js';

class Entity {
  position = Vector.create(0, 0);
  velocity = Vector.create(0, 0);
}

export class Particle extends Entity {
  r = 0;
  render = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI*2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
  }
  static create({ position, velocity, r } = {}) {
    const entity = new Particle();
    if (position) entity.position.addTo(position);
    if (velocity) entity.velocity.addTo(velocity);
    if (r) entity.r = r;
    return entity;
  }
}
