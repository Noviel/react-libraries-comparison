import React from 'react';
import { NextStatelessComponent } from 'next';

import { version } from '@game/core';

import TestWorker from '../test.worker.ts';

function runWorker() {
  try {
    const worker = new TestWorker();
    worker.postMessage('from Host');
    worker.addEventListener('message', ev => {
      console.log('new event from worker', ev);
    });
    console.log('worker started', worker);
  } catch (e) {
    console.log(e);
  }
}

if ((process as any).browser) {
  runWorker();
}

interface Props {
  data: string;
}

const GamePageIndex: NextStatelessComponent<Props> = ({ data }) => {
  return (
    <div>
      data: {data} {version}
    </div>
  );
};

GamePageIndex.getInitialProps = async () => {
  return {
    data: process.env.WEBPACK_VAR,
  };
};

export default GamePageIndex;
