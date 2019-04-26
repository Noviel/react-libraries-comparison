import React from 'react';
import { Observer } from 'mobx-react-lite';

import { ClientApiCreator } from '@project/clicker-core/client/api';
import { ClientManager } from '@project/clicker-core/client-manager/model';
import { ClickerMain } from '@project/clicker-web/components/ClickerMain';

interface Props {
  clickers: ClientManager;
  api?: ClientApiCreator;
}

const ClickerManager: React.FC<Props> = ({ clickers, api }) => {
  function handleAddClient() {
    if (api) {
      const client = clickers.add(api);
      client.connect();
    }
  }

  function removeClient(clientId: number) {
    clickers.remove(clientId);
  }

  return (
    <div>
      <h1>Clicker game</h1>
      <Observer>
        {() => (
          <>
            Total clicks: {clickers.totalClicks}
            <br />
            Total clickers: {clickers.clientsById.length}
            <br />
          </>
        )}
      </Observer>
      <Observer>
        {() => (
          <>
            <button onClick={handleAddClient}>Add clicker</button>
            {clickers.clientsById.map(clientId => (
              <ClickerMain
                key={clientId}
                client={clickers.clients[clientId]}
                remove={removeClient}
              />
            ))}
          </>
        )}
      </Observer>
    </div>
  );
};

export { ClickerManager };
