export const dpad = {
  right: 0,
  left: 0,
  up: 0,
  down: 0
};

const keydown = (e) => {
  if (e.code === "KeyW" || e.code === "ArrowUp") {
    dpad.up = 1;
  }
  if (e.code === "KeyS" || e.code === "ArrowDown") {
    dpad.down = 1;
  }
  if (e.code === "KeyA" || e.code === "ArrowLeft") {
    dpad.left = 1;
  }
  if (e.code === "KeyD" || e.code === "ArrowRight") {
    dpad.right = 1;
  }
};
const keyup = (e) => {
  if (e.code === "KeyW" || e.code === "ArrowUp") {
    dpad.up = 0;
  }
  if (e.code === "KeyS" || e.code === "ArrowDown") {
    dpad.down = 0;
  }
  if (e.code === "KeyA" || e.code === "ArrowLeft") {
    dpad.left = 0;
  }
  if (e.code === "KeyD" || e.code === "ArrowRight") {
    dpad.right = 0;
  }
};

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
