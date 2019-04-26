import React from 'react';
import { NextStatelessComponent } from 'next';

import { version } from '@project/clicker-core';

interface Props {
  data: string;
}

const GamePageIndex: NextStatelessComponent<Props> = ({ data }) => {
  return (
    <div>
      SSR with NExt.js data: {data} {version}
    </div>
  );
};

GamePageIndex.getInitialProps = async () => {
  return {
    data: process.env.WEBPACK_VAR || 'something wrong with webpack',
  };
};

export default GamePageIndex;
