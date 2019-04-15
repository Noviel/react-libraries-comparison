console.log(`Executing test worker`);

const ctx: Worker = self as any;

ctx.addEventListener('message', event => console.log('Worker received:', event.data));
ctx.postMessage('from Worker');

export default ctx;
