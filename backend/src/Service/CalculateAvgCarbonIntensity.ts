import axios from 'axios';
import moment from 'moment';

const baseURL = "https://carbon-aware-api.azurewebsites.net"

export async function getAvgCarbonIntensityOverTime(location: string, startTime: Date) {
    const endTime =  moment(startTime).add(7);
    let avg = 0;
    await axios.get(baseURL + '/emissions/average-carbon-intensity', 
    {
        params : 
        {
            location: location,
            startTime: startTime.toISOString() ,
            endTime: endTime.toISOString(), 
        }
    }).then(function(response){
        avg = response.data.carbonIntensity;
    });
    console.log(avg);
    return avg;
}

export async function getCurrentCarbonIntensity(location: string) {
    let curr = 0;
    await axios.get(baseURL + '/emissions/bylocation', 
    {
        params : 
        {
            location: location,
        }
    }).then(function (response){
        curr = response.data[0].rating
    });
    console.log(curr);
    return curr;
}

// export function isGridDirty(location: string, startTime: Date): Boolean{
//     let curr = getCurrentCarbonIntensity(location); 
//     console.log(curr)
//     let avg = getAvgCarbonIntensityOverTime(location, startTime); 
//     console.log(avg);
//     console.log(curr > avg);
//     console.log(100 > 50);
//     return (curr > avg);
// }

export function isGridDirty(curr: number, avg: number) {
    console.log(curr>avg)
    return (curr > avg); 
}