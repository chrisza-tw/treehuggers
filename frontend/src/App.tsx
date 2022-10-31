import { useState } from 'react'
import './App.css'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

function App() {
  const [isExactLocationPermitted, setIsExactLocationPermitted] = useState(false)
  const [roughLocation, setRoughLocation] = useState("")
  const [exactLocation, setExactLocation] = useState({} as Object)
  const [isErrorGetExactLocation, setIsErrorGetExactLocation] = useState(false)

  const handleChange = (event: any) => {
    setIsExactLocationPermitted(event.target.checked);
    if (event.target.checked) getExactLocation()
    setRoughLocation("")
  };

  const handleDropdownChange = (event: any) => {
    setRoughLocation(event.target.value);
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

  const postSubscribe = () => {
    const postBody = Object.entries(exactLocation).length != 0 ? exactLocation : { roughLocation }
    console.log("posting..")
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
          <option value={"SG"}>Singapore</option>
          <option value={"AUS"}>Australia</option>
        </Select></div>)
        }

        <br/>
        {
        (isExactLocationPermitted || roughLocation) &&
        <Button onClick={postSubscribe}>Subscribe</Button>
        }

      </div>
    </div>
  )
}

export default App
