import React from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ProfileItemHolder from './ProfileItemHolder'
import { ScrollView, Text } from 'react-native'
const iconSize = 30
const data = [
  {
    id: "dsjfndjsn",
    name: "Visit the Help Centre",
    iconComponent: <Feather name="help-circle" size={iconSize}  />
  },
  {
    id: "asjdansjk",
    name: "Get gelp with a safety issue",
    iconComponent: <MaterialCommunityIcons name="shield-outline" size={iconSize}  />
  },
  {
    id: "Report",
    name: "Report a concern",
    iconComponent: <Feather name="flag" size={iconSize}  />
  },
]
function GetHelp() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{padding: 16}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {data.map((item, index) => <ProfileItemHolder key={item.id} id={item.id} name={item.name} iconComponent={item.iconComponent} onClick={() => {}}/>)}
          <Text style={ {fontSize: 42, padding: 12,}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default GetHelp