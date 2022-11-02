import { Router, Request, Response } from "express";
import { BASE } from "../constants/base";
import { getAvgCarbonIntensityOverTime, getCurrentCarbonIntensity, isGridDirty } from "../controller/CalculateAvgCarbonIntensity";
import bodyParser from "body-parser";
import { subscribe } from "../service/Subscriber"

const router = Router();
const jsonParser = bodyParser.json()

router.get(BASE.PREFIX + '/gridstatus', async (req: Request, res: Response) => {
  try {
    let avg =  await getAvgCarbonIntensityOverTime('eastus', new Date('2022-10-27'));
    let curr =  await getCurrentCarbonIntensity('eastus');
    res.send(isGridDirty(curr, avg));
  } catch (error) {
    res.send(error)
  }
});

router.post(BASE.PREFIX + '/subscribe', jsonParser, async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    subscribe(req.body)
    res.send("Subscribed!")
  } catch (error) {
    console.log("Error in POST /subscribe", error)
    res.send(error)
  }
})

export {router};