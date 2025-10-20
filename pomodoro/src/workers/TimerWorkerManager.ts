import type { TaskStateModel } from '../models/TaskStateModel';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.ts', import.meta.url), {
      type: 'module',
    });
  }

  static getInstance(): TimerWorkerManager {
    if (!instance) {
      instance = new TimerWorkerManager();
    }

    return instance;
  }

  public postMessage(message: TaskStateModel): void {
    this.worker.postMessage(message);
  }

  public onmessage(handler: (event: MessageEvent) => void): void {
    this.worker.onmessage = handler;
  }

  public terminate(): void {
    this.worker.terminate();
    instance = null;
  }
}
