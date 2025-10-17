let instance: Worker | null = null;

export class TimerWorkerManager {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timerWorker.ts', import.meta.url));
  }

  public static getInstance(): Worker {
    if (!instance) {
      const manager = new TimerWorkerManager();
      instance = manager.worker;
    }
    return instance;
  }

  public postMessage(message: any) {
    this.worker.postMessage(message);
  }

  public onMessage(handler: (event: MessageEvent) => void) {
    this.worker.onmessage = handler;
  }

  public terminate() {
    this.worker.terminate();
    instance = null;
  }
}
