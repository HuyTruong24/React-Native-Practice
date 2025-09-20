import React, {useState} from 'react'
import { Switch } from 'react-native'
Switch
function CustomSwitch({onValueChange}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        onValueChange(isEnabled) //take 100 seconds to complete
        setIsEnabled((previousState) => !previousState);
        
    }
  return (
    <Switch 
        trackColor={{ false: "#6e6e6eff", true: "#171717ff" }}
        thumbColor={{ true: "#f4f3f4"}}
        ios_backgroundColor="#7d7d7dff"
        onValueChange={toggleSwitch}
        value={isEnabled}
    />
  )
}

export default CustomSwitch