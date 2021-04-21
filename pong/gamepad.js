export default class Gamepad {
  dpad1 = [0, 0];
  dpad2 = [0, 0];

  init(worker) {
    const scanGamepadState = () => {
      const gamepads = navigator.getGamepads();
      const { dpad1, dpad2 } = this;

      if (gamepads[0]) {
        if (gamepads[0].id.includes('Joy-Con (L)')) {
          dpad1[0] = gamepads[0].axes[1];
          dpad1[1] = gamepads[0].axes[0] * -1;
        }
        else if (gamepads[0].id.includes('Joy-Con (R)')) {
          dpad2[0] = gamepads[0].axes[1];
          dpad2[1] = gamepads[0].axes[0] * -1;
        }
        else if (gamepads[0].id.includes('Joy-Con L+R')) {
          dpad1[0] = gamepads[0].axes[0];
          dpad1[1] = gamepads[0].axes[1];
          dpad2[0] = gamepads[0].axes[2];
          dpad2[1] = gamepads[0].axes[3];
        }

      }

      // if (gamepads[1]) {
      //   dpad2[0] = gamepads[1].axes[1];
      //   dpad2[1] = gamepads[1].axes[0];
      // }

      worker.postMessage({ type: 'GAMEPAD_UPDATE', dpad1, dpad2 });
      requestAnimationFrame(scanGamepadState);
    };

    scanGamepadState();

    window.addEventListener("gamepadconnected", (e) => {
      console.log(`Gamepad${e.gamepad.index + 1} connected`)
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      console.log(`Gamepad${e.gamepad.index + 1} disconnected`)
    });

    window.addEventListener('keydown', (e) => {
      if (e.key == 'd') this.dpad1[0] = 1;
      if (e.key == 'a') this.dpad1[0] = -1;
      if (e.key == 'w') this.dpad1[1] = -1;
      if (e.key == 's') this.dpad1[1] = 1;
      if (e.key == 'ArrowRight') this.dpad2[0] = 1;
      if (e.key == 'ArrowLeft') this.dpad2[0] = -1;
      if (e.key == 'ArrowUp') this.dpad2[1] = -1;
      if (e.key == 'ArrowDown') this.dpad2[1] = 1;
    }, false);
    window.addEventListener('keyup', (e) => {
      if (e.key == 'd') this.dpad1[0] = 0;
      if (e.key == 'a') this.dpad1[0] = 0;
      if (e.key == 'w') this.dpad1[1] = 0;
      if (e.key == 's') this.dpad1[1] = 0;
      if (e.key == 'ArrowRight') this.dpad2[0] = 0;
      if (e.key == 'ArrowLeft') this.dpad2[0] = 0;
      if (e.key == 'ArrowUp') this.dpad2[1] = 0;
      if (e.key == 'ArrowDown') this.dpad2[1] = 0;
    }, false);
  }

  static create(worker) {
    const gamepad = new Gamepad();
    gamepad.init(worker);
    return gamepad;
  }
}
