import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
const { getFirestore } = require('firebase-admin/firestore');
import {router} from './src/router/router'
import { b64ToObject } from './src/utils/converter';
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const serviceAccountKey = process.env.FIREBASE_SECRETS || ""

app.use(cors())
app.use(router);

// Initialize Firebase
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(b64ToObject(serviceAccountKey))
});

const db = getFirestore();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {console.log(`⚡️[server]: Server is running at https://localhost:${port}`)});
