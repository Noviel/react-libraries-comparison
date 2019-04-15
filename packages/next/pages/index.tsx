import React from 'react';
import { NextStatelessComponent } from 'next';

import { version } from '@game/core';

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
