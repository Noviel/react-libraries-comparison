import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as next from "next";
import * as express from "express";
import * as compression from "compression";
import * as helmet from "helmet";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { getVersion } from "./lib";

admin.initializeApp();

const nextApp = next({ dev: false, conf: { distDir: "next" } });
const handle = nextApp.getRequestHandler();

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send(`Hello from Firebase! ${getVersion()}\n\n`);
});

const server = express();

server.disable("x-powered-by");
server.use(cors());
server.use(bodyParser.json());
server.set("trust proxy", 1);
server.use(compression());
server.use(helmet());

server.get("*", (req, res) => handle(req, res));

const app = functions.https.onRequest(async (req, res) => {
  await nextApp.prepare();
  return server(req, res);
});

export { app };
