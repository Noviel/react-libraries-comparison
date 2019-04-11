import React from "react";
import { NextStatelessComponent } from "next";

import { version } from "@game/core";

interface Props {
  data: string;
}

const GamePageIndex: NextStatelessComponent<Props> = ({ data }) => {
  return (
    <div>
      data: {data} Index Page!!! {version}
    </div>
  );
};

GamePageIndex.getInitialProps = async () => {
  return {
    data: "some fake data"
  };
};

export default GamePageIndex;
