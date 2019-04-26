interface ClientData {
  clicks: number;
}

export class Host {
  clients: Record<string, ClientData>;

  constructor() {
    this.clients = {};
  }

  public async accept(clientId: number) {
    this.clients[clientId] = {
      clicks: 100,
    };

    return { data: this.clients[clientId].clicks };
  }

  public async drop(clientId: number) {
    delete this.clients[clientId];

    return { data: 'ok' };
  }

  public async click(clientId: number) {
    const newClicks = ++this.clients[clientId].clicks;

    return { data: newClicks };
  }
}
