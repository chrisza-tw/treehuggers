import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
const { getFirestore } = require('firebase-admin/firestore');
import { getAvgCarbonIntensityOverTime, getCurrentCarbonIntensity, isGridDirty } from './Service/CalculateAvgCarbonIntensity'
import { b64ToObject } from './utils/converter';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const serviceAccountKey = process.env.FIREBASE_SECRETS || ""

// Initialize Firebase
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(b64ToObject(serviceAccountKey))
});

const db = getFirestore();

async function readData() {
  try{
    const snapshot = await db.collection('treehugger').get();
    snapshot.forEach((doc: { id: any; data: () => any; }) => {
      console.log(doc.id, '=>', doc.data());
    });
  }catch(error){
    console.error(error)
  }
};

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// async function isGridDirty(){
//   let avg =  await getAvgCarbonIntensityOverTime('eastus', new Date('2022-10-27'));
//   let curr = await getCurrentCarbonIntensity('eastus');
// }

app.listen(port, async() => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  readData();
  let avg =  await getAvgCarbonIntensityOverTime('eastus', new Date('2022-10-27'));
  let curr =  await getCurrentCarbonIntensity('eastus');
  isGridDirty(curr, avg);
});
