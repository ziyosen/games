import Vector from '../vector.js';

export class Ray {
  position = Vector.create(0, 0);
  direction = Vector.create(1, 0);
  static create({ position, angle } = {}) {
    const entity = new Ray();
    if (position) entity.position.addTo(position);
    if (angle) entity.direction.angle = angle;
    return entity;
  }
  pointAt({ x, y }) {
    this.direction.angle = Math.atan2(y - this.position.y, x - this.position.x);
  }
  cast = (boundary) => {
    // const A1 = boundary.a.y - boundary.b.y;
    // const B1 = p0.x - p1.x;
    // const C1 = A1 * p0.x + B1 * p0.y;
    // const A2 = p3.y - p2.y;
    // const B2 = p2.x - p3.x;
    // const C2 = A2 * p2.x + B2 * p2.y;
    // const denominator = A1 * B2 - A2 * B1;

    // if (denominator === 0) {
    //   return null;
    // }

    // const intersetX = (B2 * C1 - B1 * C2) / denominator;
    // const intersetY = (A1 * C2 - A2 * C1) / denominator;
    // const rx0 = (intersetX - p0.x) / (p1.x - p0.x);
    // const ry0 = (intersetY - p0.y) / (p1.y - p0.y);
    // const rx1 = (intersetX - p2.x) / (p3.x - p2.x);
    // const ry1 = (intersetY - p2.y) / (p3.y - p2.y);

    // if (ray) {
    //   return { x: intersetX, y: intersetY }
    // }

    // if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
    //     ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
    //   return { x: intersetX, y: intersetY }
    // }

    const x1 = boundary.a.x;
    const y1 = boundary.a.y;
    const x2 = boundary.b.x;
    const y2 = boundary.b.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      return {
        point: Vector.create(x1 + t * (x2 - x1), y1 + t * (y2 - y1)),
        distance: u,
      }
    }
  };
}
