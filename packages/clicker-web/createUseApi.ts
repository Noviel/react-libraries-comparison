import { useState, useEffect } from 'react';

import { isClient } from '@project/utils/isClient';
import { HostCaller } from '@project/clicker-core/types';
import { createApi, ClientApiCreator } from '@project/clicker-core/client/api';

export function createUseApi(createHostCaller: () => Promise<HostCaller>) {
  return function useApi() {
    const [api, setApi] = useState<{ api: ClientApiCreator }>();

    useEffect(() => {
      if (isClient()) {
        createHostCaller().then(hostCaller => {
          setApi({ api: createApi(hostCaller) });
        });
      }
    }, []);

    return {
      api: api && api.api,
    };
  };
}
