import Vector from './vector.js';
import { Ball, Box } from './entities.js';

export const INIT = 'INIT';
export const PAUSE = 'PAUSE';
export const RESUME = 'RESUME';

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

  const entities = [];

  const render = (time) => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(44, 62, 80, .9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    update(entities);
    entities.forEach(entity => { entity.render(ctx) });
    requestAnimationFrame(render);
  }

  const update = () => {
    // TODO: change position, check, fix if bouncing, update velocity
    // need to fix: x,y should be always integer!!!
    entities.forEach(entity => {
      const next = entity.position.add(entity.velocity);
      entity.position.addTo(entity.velocity);

      if(next.x > ctx.canvas.width - entity.r || next.x < entity.r) {
        entity.velocity.x = entity.velocity.x * -1 // -.9;
      }

      if(next.y > ctx.canvas.height - entity.r || next.y < entity.r) {
        // this.position.y = ctx.canvas.height - this.r;
        entity.velocity.y = entity.velocity.y * -1 // -.9;
      }
    });

    for (let i = 1; i < entities.length; i++) {
      const box = entities[i];
      const next = box.position.add(box.velocity);
      const dx = Math.abs(next.x - box.position.x) - box.width / 2;
      const dy = Math.abs(next.y - box.position.y) - box.height / 2;

      if (box.hitTest({ x: next.x - entities[0].r, y: next.y - entities[0].r, width: entities[0].r * 2, height: entities[0].r * 2 })) {
        // if (i === 0 && navigator.getGamepads()[0]) {
        //   if (navigator.getGamepads()[0].vibrationActuator) {
        //     navigator.getGamepads()[0].vibrationActuator.playEffect('dual-rumble', { duration: 100, startDelay: 0, strongMagnitude: .1, weakMagnitude: 1 })
        //   }
        // }
        if (dx > dy) {
          // this.position.x = box.position.x < this.position.x ?
          //   box.position.x + box.width / 2 + ball.r: box.position.x - box.width / 2 - ball.r; // magic numbers
          //
          box.velocity.x = entities[0].velocity.x * -1.05;
        } else {
          // this.position.y = box.position.y - box.height / 2;
          box.velocity.y = entities[0].velocity.y * -1.05;
        }
        // xDist < ball.r && yDist < 0 || yDist < ball.r && xDist < 0 || xDist**2 + yDist**2 < ball.r**2
        break;
      }
    }
  }

  entities[0] = Ball.create({ position: Vector.create(400, 400), velocity: Vector.create(10, 10), r: 10 });
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

// self.addEventListener('message',
self.onmessage = e => {
  const { type, config, canvas } = e.data;
  console.log(e.data)
  init({ config: e.data.config, canvas: e.data.canvas });
  // switch (type) {
  //   case INIT:
  //     console.log('asdasd')
  //     return init({ config, canvas });
  //   case PAUSE:
  //     return true;
  //   case RESUME:
  //     return true;
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
// });
