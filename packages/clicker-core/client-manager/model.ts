import { action, computed, observable } from 'mobx';

import { Client } from '../client/model';
import { ClientApiCreator } from '../client/api';

export class ClientManager {
  @observable
  clients: Record<number, Client> = {};

  @observable
  clientsById: number[] = [];

  @computed
  get totalClicks() {
    return this.clientsById.reduce((acc, curr) => acc + this.clients[curr].clicks, 0);
  }

  @action
  add(api: ClientApiCreator) {
    const client = new Client(api);
    this.clients[client.id] = client;
    this.clientsById.push(client.id);

    return client;
  }

  @action
  remove(clientId: number) {
    this.clients[clientId].discconnect();
    const index = this.clientsById.findIndex(id => id === clientId);
    this.clientsById.splice(index, 1);
    delete this.clients[clientId];
  }
}
