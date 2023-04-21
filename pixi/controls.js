export const controls = { 
  x: 0.0, 
  y: 0.0,
  left: false,
  right: false,
  shoot: false,
  view: null,
};

export const controlsSetup = (app) => {
  const container = new PIXI.Container();
  container.interactive = true;
  container.width = app.screen.width;
  container.height = app.screen.height;
  container.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height);
  
  container.on('touchstart', (event) => {
    if (event.data.global.x < app.screen.width / 2) {
      controls.left = true;
    }
    if (event.data.global.x > app.screen.width / 2) {
      controls.right = true;
    }
  });

  container.on('touchend', (event) => {
    controls.left = false;
    controls.right = false;
  });

  container.on('mousemove', (event) => {
    controls.x = event.data.global.x;
    controls.y = event.data.global.y;
  });

  container.on('click', (event) => {
    controls.shoot = true;
  });

  // const mouse = app.renderer.plugins.interaction.mouse;
  // if (mouse.pointerType === 'mouse') {
  //   controls.x = mouse.global.x
  // }
  controls.view = container;
  
  return controls;
}