import type { TaskStateModel } from '../models/TaskStateModel';

let isRunning = false;

self.onmessage = function (event: MessageEvent<TaskStateModel>) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  if (!activeTask) {
    isRunning = false;
    return;
  }

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  function tick() {
    const now = Date.now();
    const secondsLeft = Math.round((endDate - now) / 1000);

    self.postMessage(secondsLeft);

    setTimeout(tick, 1000);
  }

  tick();
};
