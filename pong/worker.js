import Vector from './vector.js';
import { Ball, Box } from './entities.js';

export const INIT = 'INIT';
export const PAUSE = 'PAUSE';
export const RESUME = 'RESUME';

const entities = [];

// const debug = (...targets) => {
//   ctx.beginPath();
//   targets.forEach(target => {
//     const rect = target.getRect();
//     ctx.fillStyle = 'rgba(250, 250, 250, 0.4)';
//     ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
//   });
//   ctx.closePath();
// }

const init = ({ canvas, config }) => {
  const ctx = canvas.getContext("2d");
  // ctx.imageSmoothingEnabled = false;
  const render = (time) => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(44, 62, 80, .9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity => { entity.update(ctx) });
    entities.forEach(entity => { entity.render(ctx) });
    requestAnimationFrame(render);
  }

  entities[0] = Ball.create({ position: Vector.create(400, 400), velocity: Vector.create(1, 10), r: 10 });
  entities[1] = Box.create({ position: Vector.create(20, 400), width: 10, height: 100 });
  entities[2] = Box.create({ position: Vector.create(1380, 400), width: 10, height: 100 });

  requestAnimationFrame(render);
}

// const gravity = Vector.create(0, .1);
// let prevFrame = Date.now();
// var a = 50;
// var v =  Vector.create(1, 0);
// var p =  Vector.create(0, 0);
// let canvas = null;

self.addEventListener('message', e => {
  const { type, entities, canvas } = e.data;
  switch (type) {
    case INIT:
      return init({ entities, canvas });
    case PAUSE:
      return true;
    case RESUME:
      return true;
  }

  // const elapsedTime = (Date.now() - prevFrame) / (1000 / 60);
  // prevFrame = Date.now();
  // const entities = e.data.entities;
  // if (e.data.canvas) {
  //   canvas = e.data.canvas;
  // }

  //entities[0] = Vector.create(entities[0].x, entities[0].y).add(gravity)); // gravity
  // if (a > 0) {
  //   for (let i = 0; i < 1000000000; i++) {
  //     Math.sqrt(i);
  //   }
  // }
  // a--;

  // function render(time) {
    // v = v.add(gravity);
    // p.addTo(v);

  //   requestAnimationFrame(render);
  // }
  // requestAnimationFrame(render);

  // postMessage(entities);

  // ball.velocity.addTo(Vector.create(0, .1)); // gravity
  // box.velocity.x = controller.dpad1.x * 5;
  // // box.velocity.addTo(Vector.create(controller.dpad1.x * .2, 0));
  // // box.velocity.y = controller.direction.y * 10;
  // box3.velocity.x = controller.dpad2.x * 5;
  // // ball.velocity = ball.velocity.multiply(.99);
  // box.update(ctx); // user input first
  // box3.update(ctx);
  // ball.update(ctx, [ box, box2, box3 ])
});
