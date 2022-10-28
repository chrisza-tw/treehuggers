import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const { getFirestore } = require('firebase-admin/firestore');
import { getAvgCarbonIntensityOverTime } from './Service/CalculateAvgCarbonIntensity'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const serivceAccKeyPath = process.env.FIREBASE_SECRET || "/Users/serenequekkaizhen/beach/treehuggers/backend/serviceAccountKey.json"

// Initialize Firebase
const admin = require("firebase-admin");
const serviceAccount = require(serivceAccKeyPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  readData();
  getAvgCarbonIntensityOverTime('eastus', new Date('October 13, 2022 01:00:00 GMT-3:00'), new Date('October 20, 2022 01:00:00 GMT-3:00'))
});
