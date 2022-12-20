export class AABB {
  ol = 0; ot = 0; or = 0; ob = 0; vx = 0; vy = 0;
  left = 0; top = 0; right = 0; bottom = 0; 
  width = 0; height = 0;
  
  static create({ x, y, width, height }) {
    const aabb = new AABB();
    aabb.width = width;
    aabb.height = height;
    aabb.left = x;
    aabb.top = y;
    aabb.update();
    return aabb;
  }
  update() {
    this.ol = this.left;
    this.ot = this.top;
    this.or = this.right;
    this.ob = this.bottom;
    this.left = this.left += this.vx,
    this.top = this.top += this.vy,
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }
}

export const intersectAABB = (a, b, state) => {
  if (a.bottom < b.top || a.top > b.bottom || a.left > b.right || a.right < b.left) {
    return;
  }

  if (a.bottom >= b.top && a.ob < b.ot) {
    a.vx = b.vx;
    a.vy = b.vy;
    a.bottom = b.top - 0.001;
    a.top = a.bottom - a.height;
    state.isJumping = false;
  } 
  else if (a.top <= b.bottom && a.ot > b.ob) {
    // a.vx = b.vx;
    a.vy = b.vy;
    a.top = b.bottom + 0.001;
    a.bottom = a.top + a.height;
  }
  else if (a.left <= b.right && a.ol > b.or) {
    a.vx = b.vx;
    a.left = b.right + 0.001;
    a.right = a.left + a.width;
  }
  else if (a.right >= b.left && a.or < b.ol) {
    a.vx = b.vx;
    a.right = b.left - 0.001;
    a.left = a.right - a.width;
  }
};