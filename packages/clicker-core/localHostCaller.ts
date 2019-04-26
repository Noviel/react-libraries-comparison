import { HostCaller } from './types';
import { Host } from './host';

export function createLocalHostCaller() {
  const host = new Host();
  return host as HostCaller;
}
