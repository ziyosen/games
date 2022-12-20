import { player } from "./entities/player.js";
import { platforms } from "./entities/platforms.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const loop = () => {
  platforms.update();
  player.update(platforms.entities);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  platforms.render(ctx);
  player.render(ctx);

  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);