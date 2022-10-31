import { Router, Request, Response } from "express";
import { BASE } from "../constants/base";
import { getAvgCarbonIntensityOverTime, getCurrentCarbonIntensity, isGridDirty } from "../service/CalculateAvgCarbonIntensity";

const router = Router();

router.get(BASE.PREFIX + '/gridstatus', async (req: Request, res: Response) => {
    let avg =  await getAvgCarbonIntensityOverTime('eastus', new Date('2022-10-27'));
    let curr =  await getCurrentCarbonIntensity('eastus');
    res.send(isGridDirty(curr, avg));
  });


export {router};