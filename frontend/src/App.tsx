import { useState } from 'react'
import './App.css'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import RoughLocations from './RoughLocations';

function App() {
  const [isExactLocationPermitted, setIsExactLocationPermitted] = useState(false)
  // const [roughLocation, setRoughLocation] = useState("")
  const [exactLocation, setExactLocation] = useState({} as Object)
  const [isErrorGetExactLocation, setIsErrorGetExactLocation] = useState(false)


  const handleChange = (event: any) => {
    setExactLocation({})
    setIsExactLocationPermitted(event.target.checked);
    if (event.target.checked) getExactLocation()
    else setExactLocation({})
  };

  const handleDropdownChange = (event: any) => {
    const selectedRoughLocation = RoughLocations.locations.find(location => { return location.RegionName == event.target.value })
    setExactLocation({
      latitude: Number(selectedRoughLocation?.latitude),
      longitude: Number(selectedRoughLocation?.longitude)
    });
  };

  const getExactLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }

  const onSuccess = (position: any) => {
    const {
      latitude,
      longitude
    } = position.coords;
    setExactLocation({latitude, longitude})
  }

  const onError = () => {
    setIsExactLocationPermitted(false)
    setIsErrorGetExactLocation(true)
  }

  const postSubscribe = async () => {
    if ('serviceWorker' in navigator) {
      console.log('yes')
      let sw = await navigator.serviceWorker.register('/sw.js');
      console.log(sw);
    }

    console.log("posting..")

    let sw = await navigator.serviceWorker.ready
    console.log("ready sw")
    console.log(sw)

    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        'BFKfUxhAxri9nJeDdEp3NbWjShlgb5KXj0B-F7hml2T6IT6JOtsBpvxUlGcEjkFbeXItDa-gDAL2McUo66gnkOw'
    });
    console.log(JSON.stringify(push));

    const postBody = {
      ...exactLocation,
      endpoint: push.endpoint
    }
    axios.post("https://treehugger-sg.herokuapp.com/api/v1/subscribe", postBody).then(response => console.log).catch(error => console.log)
  }

  return (
    <div className="App">
      <div>
        Based on your location, we can notify you when to switch to battery in order to lower the carbon emissions of your laptop usage!
        <br/>
        <br/>

        <FormControlLabel control={<Checkbox checked={isExactLocationPermitted} color="primary" onChange={handleChange} />} disabled={isErrorGetExactLocation} label="Share my exact location"/>

        <br/>
        {!isExactLocationPermitted && 
        (<div>
        <p>Not able to retrieve your exact location, kindly provide the location nearest to you:</p>
        <Select onChange={handleDropdownChange}>
          {
            RoughLocations.locations.sort((locationA, locationB) => {
              if (locationA.RegionName > locationB.RegionName) return 1
              else if (locationA.RegionName < locationB.RegionName) return -1
              else return 0
            })
              .map(location => (
              <option value={location.RegionName}>{location.RegionName}</option>
            ))
          }
        </Select></div>)
        }

        <br/>
        {
        (Object.entries(exactLocation).length != 0) &&
        <Button onClick={postSubscribe}>Subscribe</Button>
        }

      </div>
    </div>
  )
}

export default App
