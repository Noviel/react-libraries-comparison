import React from 'react';
import { NextStatelessComponent } from 'next';

import { version } from '@project/clicker-core';

import { createRemoteHostCaller } from '@project/clicker-core/remoteHostCaller';
import { createLocalHostCaller } from '@project/clicker-core/localHostCaller';
import { ClientManager } from '@project/clicker-core/client-manager/model';
import { createWorkerHostCaller } from '@project/clicker-web/host/webWorkerHostCaller';
import { ClickerManager } from '@project/clicker-web/components/ClickerManager';
import { createUseApi } from '@project/clicker-web/createUseApi';

const clickersLocal = new ClientManager();
const clickersWebWorker = new ClientManager();
const clickersRemote = new ClientManager();

const useClickesLocalApi = createUseApi(async () => createLocalHostCaller());
const useClickersWebWorkerApi = createUseApi(createWorkerHostCaller);
const useClickersRemoteApi = createUseApi(async () =>
  createRemoteHostCaller((process.env as any).PUBLIC_CLICKER_API_URL)
);

interface Props {
  data: string;
}

const NextClickerPage: NextStatelessComponent<Props> = () => {
  const { api: apiLocal } = useClickesLocalApi();
  const { api: apiWebWorker } = useClickersWebWorkerApi();
  const { api: apiRemote } = useClickersRemoteApi();

  return (
    <div>
      Clicker version: {version}
      <div>Connection host via WebWorker</div>
      <ClickerManager clickers={clickersLocal} api={apiLocal} />
      <div>Connection host via WebWorker</div>
      <ClickerManager clickers={clickersWebWorker} api={apiWebWorker} />
      <div>Connection to host on remote API server</div>
      <ClickerManager clickers={clickersRemote} api={apiRemote} />
    </div>
  );
};

NextClickerPage.getInitialProps = async () => {
  return {
    data: process.env.WEBPACK_VAR || 'something wrong with webpack',
  };
};

export default NextClickerPage;
