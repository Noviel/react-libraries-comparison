import React from 'react';
import { NextStatelessComponent } from 'next';

import { version } from '@game/core';
import { run } from '@game/utils/worker-runner';
import { isServer } from '@game/utils/isServer';

import TestWorker from '../test.worker';

interface Props {
  data: string;
}

if (!isServer()) {
  const r = run(TestWorker);
  if (r) {
    r.postMessage('asdasd');
    r.addEventListener('message', ev => {
      console.log('got from worker', ev);
    });
  }
}

const GamePageIndex: NextStatelessComponent<Props> = ({ data }) => {
  return (
    <div>
      Client game data: {data} {version}
    </div>
  );
};

GamePageIndex.getInitialProps = async () => {
  return {
    data: process.env.WEBPACK_VAR,
  };
};

export default GamePageIndex;
