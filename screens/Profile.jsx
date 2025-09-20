import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Text } from "react-native";
import { StackScreen } from "react-native-screens";
import Constants from "../constants/Constants";
import AccountSettings from "../components/AccountSettings";
import GetHelp from "../components/GetHelp";
import ProfileItemHolder from "../components/ProfileItemHolder";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather, FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import Divider from "../components/Divider";
//const Stack = createNativeStackNavigator()
const iconSize = 30
const data = [
  {
    id: Constants.AccountSettings,
    name: "Account Settings",
    iconComponent: <Feather name="settings" size={iconSize} />
  }, 
  {
    id: Constants.GetHelp,
    name: "Get Help",
    iconComponent: <Feather name="help-circle" size={iconSize} />
  },
  {
    id: Constants.ViewProfile,
    name: "View Profile",
    iconComponent: <MaterialCommunityIcons name="account-box-outline" size={iconSize} />
  },
  {
    id: Constants.Privacy,
    name: "Privacy",
    iconComponent: <FontAwesome name="hand-stop-o" size={iconSize} />
  }
]
const belowDivider = [
  {
    id: Constants.ReferHost,
    name: "Refer a host",
    iconComponent: <AntDesign name="team" size={iconSize}/>
  },
  {
    id: Constants.FindCoHost,
    name: "Find a co-host",
    iconComponent: <Ionicons name="body-outline" size={iconSize}/>
  },
  {
    id: Constants.GiftCards,
    name: "Gift Cards",
    iconComponent: <Feather name="gift" size={iconSize}/>
  },
  {
    id: Constants.Legal,
    name: "Legal",
    iconComponent: <Feather name="info" size={iconSize}/>
  },
  {
    id: Constants.Logout,
    name: "Log out",
    iconComponent: <AntDesign name="logout" size={iconSize}/>
  }
]


export default function Profile(props) {
  const {navigation, route} = props

  console.log(props)
  console.log(navigation)
  const onLogout = () => {
      navigation.reset({
          index: 0,
          routes: [{ name: Constants.Logout }],
      });
  }
  const onClick = (id) => {
    if(id === Constants.GetHelp) {
      navigation.navigate(Constants.GetHelp)
    } else if(id === Constants.Privacy) {
      navigation.navigate(Constants.Privacy)
    } else if(id === Constants.Logout) {
      onLogout()
    }else {
      Alert.alert("Clicked!")
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{padding: 16}}>
        {/*<FlatList 
          data={data} 
          renderItem={({item, index}) => <ProfileItemHolder name={item.name} iconComponent={item.iconComponent}/>}
          keyExtractor={item => item.id}
        />*/}
        {data.map((item, index) => 
          <ProfileItemHolder key={item.id} id={item.id} name={item.name} iconComponent={item.iconComponent} onClick={onClick}/>
        )}
        <Divider marginVertical={20}/>
        {belowDivider.map((_item, index) => 
          <ProfileItemHolder key={_item.id} id={_item.id} name={_item.name} iconComponent={_item.iconComponent} hasArrow={_item.id === Constants.Logout ? false : true} onClick={onClick}/>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}