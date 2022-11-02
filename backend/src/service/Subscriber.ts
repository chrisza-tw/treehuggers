import {getClosestRegion} from '../controller/region-detection'
const store = []

export function subscribe(reqBody: any) {
    const closestRegion = getClosestRegion(reqBody.latitude, reqBody.longitude)
    const newSubscription = {
        endpoint: reqBody.endpoint,
        region: closestRegion.region
    }

    console.log(newSubscription)
    store.push(newSubscription)
}
