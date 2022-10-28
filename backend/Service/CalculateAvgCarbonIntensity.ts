import axios from 'axios';

// class CarbonIntensity {
//     location: string;
//     startTime?: Date;
//     endTime?: Date;

//     constructor(location: string, startTime: Date, endTime: Date) {
//         this.location = location;
//         this.startTime = startTime;
//         this.endTime = endTime;
//       }   
// }

export function getAvgCarbonIntensityOverTime(location: string, startTime: Date, endTime: Date) {
    axios.get('https://carbon-aware-api.azurewebsites.net/emissions/average-carbon-intensity', 
    {
        params : 
        {
            location: location,
            startTime: startTime.toISOString() ,
            endTime: endTime.toISOString(), 
        }
    })
    .then(function (response) {
        const result = response.data;
        console.log(result);
        return result;
    });
}