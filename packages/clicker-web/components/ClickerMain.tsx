import React from 'react';
import { Observer } from 'mobx-react-lite';

import { Client } from '@project/clicker-core/client/model';

interface Props {
  client: Client;
  remove(clientId: number): void;
}

export const ClickerMain: React.FC<Props> = ({ client, remove }) => {
  function handleClick() {
    client.click();
  }

  function handleRemoveSelf() {
    remove(client.id);
  }

  return (
    <div>
      <Observer>
        {() => (
          <>
            <h1>Clicker client {client.id}</h1>
            Clicks: {client.clicks}
            <br />
            <button onClick={handleClick}>click</button>
            <button onClick={handleRemoveSelf}>remove</button>
          </>
        )}
      </Observer>
    </div>
  );
};
