import axios from 'axios';

import { HostCaller } from './types';

export function createRemoteHostCaller(baseUrl: string): HostCaller {
  return {
    async accept(clientId: number) {
      const { data } = await axios.post(`${baseUrl}/connect`, null, {
        headers: {
          token: clientId,
        },
      });

      return data;
    },
    async click(clientId: number) {
      const { data } = await axios.post(`${baseUrl}/click`, null, {
        headers: {
          token: clientId,
        },
      });

      return data;
    },
    async drop(clientId: number) {
      const { data } = await axios.post(`${baseUrl}/disconnect`, null, {
        headers: {
          token: clientId,
        },
      });

      return data;
    },
  };
}
