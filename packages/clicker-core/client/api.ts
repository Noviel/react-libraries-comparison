import { HostCaller } from '../types';

export const createApi = (hostCaller: HostCaller) => (clientId: number) => {
  return {
    async click() {
      return hostCaller.click(clientId);
    },

    async connect() {
      return hostCaller.accept(clientId);
    },

    async disconnect() {
      return hostCaller.drop(clientId);
    },
  };
};

export type ClientApi = ReturnType<ReturnType<typeof createApi>>;
export type ClientApiCreator = (clientId: number) => ClientApi;
