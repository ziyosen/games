import { AABB, intersectAABB } from "./AABB.js";

const data = [
  { x: 0,   y: 280, width: 300, height: 10 },
  { x: 300, y: 250, width: 100, height: 10 },
  { x: 300, y: 350, width: 200, height: 10 },
  { x: 100, y: 260, width: 20,  height: 10 },
  { x: 480, y: 330, width: 20,  height: 10 },
  { x: 360, y: 230, width: 20,  height: 10 },
  { x: 550, y: 300, width: 20,  height: 10 },
  { x: 450, y: 280, width: 20,  height: 10 }
];

const entities = data.map(data => AABB.create(data));

export const platforms = {
  entities,
  update: () => {
    entities.forEach(platform => {
      platform.vx = 0;
      platform.update();
    })
  },
  render: (ctx) => {
    entities.forEach(platform => {
      ctx.fillStyle = "#45597E";
      ctx.fillRect(platform.left, platform.top, platform.width, platform.height);
    });
  }
};
