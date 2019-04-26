import { Express, Request } from 'express';

import { Host } from '@project/clicker-core/host';

const host = new Host();

const getId = (req: Request) => req.headers[`token`];

export function addHandlers(app: Express) {
  app.post('/clicker/connect', async (req, res) => {
    const id = getId(req);
    if (id) {
      const result = await host.accept(+id);
      res.send(result);
    } else {
      res.send({ data: 'no id' });
    }
  });

  app.post('/clicker/disconnect', async (req, res) => {
    const id = getId(req);
    if (id && host.clients[+id]) {
      const result = await host.drop(+id);
      res.send(result);
    } else {
      res.send({ data: 'failed' });
    }
  });

  app.post('/clicker/click', async (req, res) => {
    const id = getId(req);
    if (id && host.clients[+id]) {
      const result = await host.click(+id);
      res.send(result);
    } else {
      res.send({ data: 'failed' });
    }
  });
}
