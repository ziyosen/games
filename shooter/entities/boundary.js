import Vector from '../vector.js';

export class Boundary {
  a = Vector.create(0, 0);
  b = Vector.create(0, 0);
  static create({ a, b } = {}) {
    const entity = new Boundary();
    if (a) entity.a.addTo(a);
    if (b) entity.b.addTo(b);
    return entity;
  }
  render = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
  }
}
