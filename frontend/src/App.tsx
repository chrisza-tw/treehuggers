import { useState } from 'react'
import './App.css'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import RoughLocations from './RoughLocations';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';

const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const [isExactLocationPermitted, setIsExactLocationPermitted] = useState(false)
  const [exactLocation, setExactLocation] = useState({} as Object)
  const [isErrorGetExactLocation, setIsErrorGetExactLocation] = useState(false)
  const [hasUserSubscribed, setHasUserSubscribed] = useState(false)
  const [isGridDirty, setIsGridDirty] = useState(false)

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
    setExactLocation({ latitude, longitude })
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
      applicationServerKey: import.meta.env.VITE_APPLICATION_SERVER_KEY
    });
    console.log(JSON.stringify(push));

    const postBody = {
      ...exactLocation,
      subscription: push
    }
    axios.post(`${baseUrl}/api/v1/subscribe`, postBody)
      .then(response => {
        setIsGridDirty(response.data)
        setHasUserSubscribed(true)
      })
      .catch(error => console.log)
  }

  return (
    <div className="App">
      <div className="split left">
        <div className="centered">
          <h1>Reduce Your Carbon Emissions by clicking Subscribe!</h1>
          <p>Based on your location, we can notify you when to switch to battery in order to lower the carbon emissions of your laptop usage!</p>
        </div>
      </div>
      <div className="split right">
      
      {!hasUserSubscribed && (
        <div className="centered">
        For best results, share your location and wait for notifications!
        <br/>
        <br/>

        <FormControlLabel 
        control={<Checkbox checked={isExactLocationPermitted} color="primary" onChange={handleChange} />} 
        disabled={isErrorGetExactLocation} 
        label="Share my exact location"/>
        <br/>

        {!isExactLocationPermitted && 
        (<div>
        <p>Otherwise, kindly provide the location nearest to you:</p>
        <FormControl fullWidth>
          <InputLabel>Select Region</InputLabel>
          <Select autoWidth onChange={handleDropdownChange} label="Select Region">
              {
                RoughLocations.locations.sort((locationA, locationB) => {
                  if (locationA.RegionName > locationB.RegionName) return 1
                  else if (locationA.RegionName < locationB.RegionName) return -1
                  else return 0
                  })
                  .map(location => (
                 <MenuItem value={location.RegionName}>{location.RegionName}</MenuItem>
                ))
               }  
          </Select>
       </FormControl>
        </div>)
        }

        <br/>
        {
        (Object.entries(exactLocation).length != 0) &&
        <Button onClick={postSubscribe}>Subscribe</Button>
        }
       </div>) || 
       (<div className="centered">
        <p>Current grid status:</p>
        {isGridDirty && (<h2>&#128738; DIRTY</h2>) || (<h2><span>&#127758;</span> CLEAN</h2>)}
       </div>)}
      </div>
    </div>
  )
}

export default App
