export class WebpackWorker extends Worker {
  constructor();
}

interface Creator {
  new (): WebpackWorker;
}

declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default Creator;
}

declare namespace NodeJS {
  export interface Process {
    browser: boolean;
  }
}
