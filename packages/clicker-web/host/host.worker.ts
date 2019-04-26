import { Host } from '@project/clicker-core/host';

console.log(`Starting clicker worker`);

addEventListener('message', e => {
  console.log('worker got message', e);
});

require('comlinkjs/comlink').expose(Host, self);

export default ({} as any) as Host;
