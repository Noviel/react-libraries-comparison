console.log('inside worker', self);

const ctx: Worker = self as any;

ctx.addEventListener('message', event => console.log('Worker received:', event.data));
ctx.postMessage('from Worker');
