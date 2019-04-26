import { observable, computed, action, runInAction } from 'mobx';

import { createId } from '../id';
import { ClientApi, ClientApiCreator } from './api';

export class Client {
  @observable
  private connectionId: number = -1;

  @observable
  public clicks: number = 0;

  public api: ClientApi;

  constructor(api: ClientApiCreator) {
    this.connectionId = createId();
    this.api = api(this.connectionId);
  }

  @computed
  get id() {
    return this.connectionId;
  }

  @action
  async click() {
    const { data } = await this.api.click();
    runInAction(() => {
      this.clicks = data;
    });
  }

  @action
  async connect() {
    const { data } = await this.api.connect();
    runInAction(() => {
      this.clicks = data;
    });
  }

  @action
  async discconnect() {
    await this.api.disconnect();
    runInAction(() => {
      this.connectionId = -1;
    });
  }
}
