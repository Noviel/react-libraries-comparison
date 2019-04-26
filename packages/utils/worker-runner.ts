import { WebpackWorker } from '../../global';

interface WorkerTransport {
  post: Worker['postMessage'];
}

export function run(WorkerCreator: WebpackWorker): Worker | null {
  try {
    const worker: Worker = new (WorkerCreator as any)();
    return worker;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export function work(worker: any): Worker {
  const ctx: Worker = worker as any;

  return ctx;
}

export async function runWithComlink<T>(Worker: any) {
  const worker: Worker = new Worker();
  const ProxiedWorker = require('comlinkjs/comlink').proxy(worker);
  const instance: T = await new ProxiedWorker();
  return instance;
}
