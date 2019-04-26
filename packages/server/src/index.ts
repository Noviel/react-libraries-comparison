import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { addHandlers } from '@project/clicker-node';

const port = process.env.PORT || 3001;

const server = express();

server.disable('x-powered-by');
server.use(
  cors({
    origin: true,
  })
);
server.use(bodyParser.json());
server.set('trust proxy', 1);
server.use(compression());
server.use(helmet());

server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

addHandlers(server);
