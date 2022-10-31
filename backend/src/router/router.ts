import { Router, Request, Response } from "express";
import { getAvgCarbonIntensityOverTime, getCurrentCarbonIntensity, isGridDirty } from "../Service/CalculateAvgCarbonIntensity";

const router = Router();

router.get('/gridstatus', async (req: Request, res: Response) => {
    let avg =  await getAvgCarbonIntensityOverTime('eastus', new Date('2022-10-27'));
    let curr =  await getCurrentCarbonIntensity('eastus');
    res.send(isGridDirty(curr, avg));
  });


export {router};