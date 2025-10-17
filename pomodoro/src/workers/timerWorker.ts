let isRunning = false;

self.onmessage = function (event) {
  if (isRunning) return;

  isRunning = true;

  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  console.log(new Date(endDate));

  function tick() {
    const now = Date.now();
    const secondsLeft = Math.round((endDate - now) / 1000);

    self.postMessage(secondsLeft);

    setTimeout(tick, 1000);
  }

  tick();
};
