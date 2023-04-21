import { controlsSetup } from './controls.js';
import { createPlayer, updatePlayer } from "./player.js";
import { createEnemyGroup, updateEnemies } from "./enemy.js";
import { updateBullets } from "./bullets.js";

 const init = async () => {
  const app = new PIXI.Application({ width: 640, height: 1090 });
  app.renderer.backgroundColor = "0x02020F";

  const atlasData = {
    frames: {
      fire1: {
        frame: { x: 0, y:0, w:200, h:220 },
        sourceSize: { w: 200, h: 220 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 220 }
      },
      fire2: {
        frame: { x: 180, y:0, w:220, h:220 },
        sourceSize: { w: 200, h: 220 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 220 }
      },
      fire3: {
        frame: { x: 380, y:0, w:220, h:220 },
        sourceSize: { w: 200, h: 220 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 220 }
      },
    },
    meta: {
      image: 'assets/fire.avif',
      format: 'RGBA8888',
      size: { w: 932, h: 740 },
      scale: 1
    },
    animations: {
      fire: ['fire1','fire2','fire3'] //array of frames by name
    }
  }

  const atlasDataShips = {
    frames: {
      ship1: {
        frame: { x: 75, y:75, w:50, h:75 },
        sourceSize: { w: 200, h: 200 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 200 }
      },
      ship2: {
        frame: { x: 75, y:275, w:50, h:75 },
        sourceSize: { w: 200, h: 200 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 200 }
      },
      ship3: {
        frame: { x: 75, y:475, w:50, h:75 },
        sourceSize: { w: 200, h: 200 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 200 }
      },
      ship4: {
        frame: { x: 200, y:0, w:200, h:200 },
        sourceSize: { w: 200, h: 200 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 200 }
      },
      ship5: {
        frame: { x: 200, y:200, w:200, h:200 },
        sourceSize: { w: 200, h: 200 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 200 }
      },
      ship6: {
        frame: { x: 200, y:400, w:200, h:200 },
        sourceSize: { w: 200, h: 200 },
        spriteSourceSize: { x: 0, y: 0, w: 200, h: 200 }
      },
    },
    meta: {
      image: 'assets/ships.avif',
      format: 'RGBA8888',
      size: { w: 2000, h: 600 },
      scale: 1
    },
    animations: {
      ship_xs: ['ship1','ship2','ship3'], //array of frames by name
      ship_s:  ['ship4','ship5','ship6'], //array of frames by name
    }
  }

  const spritesheetPlayer = new PIXI.Spritesheet(
    PIXI.BaseTexture.from(atlasData.meta.image),
    atlasData
  );

  const spritesheetEnemy = new PIXI.Spritesheet(
    PIXI.BaseTexture.from(atlasDataShips.meta.image),
    atlasDataShips
  );

  await spritesheetPlayer.parse();
  await spritesheetEnemy.parse();

  const player = createPlayer(spritesheetPlayer, 320.0, app.renderer.height - 120.0);
  app.stage.addChild(player);

  const enemy = createEnemyGroup(spritesheetEnemy, 320.0, 100.0);
  app.stage.addChild(enemy);

  setInterval(() => {
    const enemy = createEnemyGroup(spritesheetEnemy, 200 + Math.random() * 200, -50.0);
    app.stage.addChild(enemy);
  }, 3000)
  
  const controls = controlsSetup(app);
  app.stage.addChild(controls.view);

  loop(app);
  
  return app;
 }

 const loop = (app) => {
  const stars = [];
  const speeds = [];
  const template = new PIXI.Graphics();
  template.beginFill(0xFFFFFF);
  template.drawCircle(0, 0, 1);
  template.endFill();

  for(var i = 0; i < 100; i++) {
    var s = new PIXI.Graphics(template.geometry);
    s.x = Math.random() * app.renderer.width;
    s.y = Math.random() * app.renderer.height;
    s.alpha = Math.random();
    s.scale.set(Math.random() * 2);
    stars.push(s);
    app.stage.addChild(s);
    speeds[i] = 0.3 + Math.random();
  }

  const filter = new PIXI.filters.CRTFilter();
  // filter.verticalLine = true;
  filter.lineWidth = 0.1;
  filter.noise = 0.3;
  filter.noiseSize = 0.1;
  app.stage.filters = [filter];
  
  let elapsed = 0.0;
  app.ticker.add((delta) => {
    elapsed += delta;
    filter.seed = Math.random();
    // filter.time += 0.1;
    for (var i = 0; i < 100; ++i) {
      var s = stars[i];
      s.y += speeds[i]
      // speeds[i] = speeds[i] + 0.5 < 20 ? speeds[i] + 0.5 : 20;
      if (s.y > app.renderer.height) s.y = 0;
    }

    updatePlayer(app, elapsed, delta);
    updateEnemies(app, elapsed, delta);
    updateBullets(app, elapsed, delta);
  });
 }

init().then(app => document.body.appendChild(app.view));
      