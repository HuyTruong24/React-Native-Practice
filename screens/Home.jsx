import React, { useCallback } from "react";
import Constants from "../constants/Constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, PlatformPressable } from '@react-navigation/elements';
import { useFocusEffect, useLinkBuilder, useTheme, getFocusedRouteNameFromRoute } from "@react-navigation/native";

import HomeTab from "./HomeTab";
import Contacts from "./Contacts";
import Profile from "./Profile";
import { Button, View, StyleSheet, useWindowDimensions } from "react-native";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Notification from "./Notification";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetHelp from "../components/GetHelp";
import ReactNative from "./ReactNative";
import Weather from "./Weather";
import Unknown from "./Unknown";

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();
const TAB_BAR_HEIGHT = 100
export default function Main() {
  return (
    <Drawer.Navigator initialRouteName={Constants.Home}>
      <Drawer.Screen name={Constants.Home} component={Home}  options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}/>
      <Drawer.Screen name={Constants.Weather} component={Weather} />
      <Drawer.Screen name={Constants.Unknown} component={Unknown} />
    </Drawer.Navigator>
  );
}
function Home({route}) {
  const dimensions = useWindowDimensions()
  const { width, height } = dimensions
  console.log(width)
  return (
      <Tab.Navigator /*tabBar={(props) => <MyTabBar {...props} />}*/ 
      screenOptions={({ route }) => ({
        tabBarPosition: width < 600 ? 'bottom' : 'left',
        tabBarIcon: ({ focused, color, size }) => {

          //console.log(route);
          let iconName;

          if (route.name === Constants.HomeTab) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === Constants.ProfileTab) {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === Constants.ContactTab) {
            iconName = focused ? 'contacts' : 'contacts-outline';
          } else if (route.name === Constants.NotificationTab) {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === Constants.ReactNative) {
            iconName = 'react'
          }

          // You can return any React component here, not just an icon
          return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: 'blue', // Color for active tab icon

        tabBarStyle: { position: "absolute" , height: TAB_BAR_HEIGHT, paddingBottom: 10, paddingTop: 10 },
        tabBarBackground: () => (
          <BlurView tint="systemUltraThinMaterialDark" intensity={10} style={StyleSheet.absoluteFillObject} />
        ), 
        headerShown: false,
        //tabBarActiveBackgroundColor: "#ddd", // Background color for active tab
         // Color for inactive tab icon
        animation: "shift"
      })}
    >
        <Tab.Screen name={Constants.HomeTab} component={HomeTab}  options={{ tabBarLabel: "Home", tabBarBadge: 3}} />
        <Tab.Screen name={Constants.ContactTab} initialParams={{tabBarHeight: TAB_BAR_HEIGHT}} component={Contacts} options={{ tabBarLabel: "Contacts", tabBarBadge: 2  }} />
        <Tab.Screen name={Constants.NotificationTab} 
                    component={Notification} 
                    options={{ 
                      tabBarLabel: "Notification", 
                      tabBarBadge: 5, 
                    }} 
        />
        <Tab.Screen name={Constants.ReactNative}  component={ReactNative}  options={{ tabBarLabel: "React-Native", tabBarBadge: 1 }} ></Tab.Screen>
        <Tab.Screen name={Constants.ProfileTab} params={{name: 'Huy'}}  component={Profile}  options={{ tabBarLabel: "Profile", tabBarBadge: 1 }} >
            {/*props => <ProfileStack.Screen name={Constants.GetHelp} component={GetHelp}  options={{ headerShown: false }}/>*/}
        </Tab.Screen>
      </Tab.Navigator>
    
  );
}
function getHeaderTitle(route) {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? Constants.HomeTab;
  switch (routeName) {
    case Constants.HomeTab:
      return 'Home';
    case Constants.ContactTab:
      return 'Contacts';
    case Constants.NotificationTab:
      return 'Notifications';
    case Constants.ProfileTab:
      return 'Profile';
    case Constants.ReactNative:
      return 'React Native Practice';
    default:
      return 'App';
  }
}
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    elevation: 10,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  }
});
