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
