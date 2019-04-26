import { runWithComlink } from '@project/utils/worker-runner';

import { HostCaller } from '@project/clicker-core/types';
import HostWorker from './host.worker';

export async function createWorkerHostCaller() {
  return runWithComlink<HostCaller>(HostWorker);
}
