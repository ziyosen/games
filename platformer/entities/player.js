import config from "../config.js";
import { dpad } from "../gamepad.js";
import { AABB, intersectAABB } from "./AABB.js";

const data = {
  x: 320,
  y: 200,
  width: 15,
  height: 19,
};

const entitity = AABB.create(data);
const state = { isJumping: false }

export const player = {
  update: (platforms) => {
    // entitity.vx *= config.friction;
    entitity.vy += config.gravity;

    if (dpad.left) {
      entitity.vx = -2.5;
    } 
    if (dpad.right) {
      entitity.vx = 2.5;
    }
    if (dpad.up && !state.isJumping) {
      state.isJumping = true;
      entitity.vy = -3.5;
    }

    entitity.update();
    platforms.forEach(platform => intersectAABB(entitity, platform, state));
  },
  render: (ctx) => {
    ctx.fillStyle = "#F08080";
    ctx.fillRect(entitity.left, entitity.top, entitity.width, entitity.height);
  }
};

