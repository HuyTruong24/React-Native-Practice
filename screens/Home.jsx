import React from "react";
import Constants from "../constants/Constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from "@react-navigation/native";

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

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator()
export default function Home() {
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

        tabBarStyle: { position: "absolute" , height: 100, paddingBottom: 10, paddingTop: 10 },
        tabBarBackground: () => (
          <BlurView tint="systemUltraThinMaterialDark" intensity={10} style={StyleSheet.absoluteFillObject} />
        ), 
        //tabBarActiveBackgroundColor: "#ddd", // Background color for active tab
         // Color for inactive tab icon
        animation: "shift"
      })}
    >
        <Tab.Screen name={Constants.HomeTab} component={HomeTab}  options={{ tabBarLabel: "Home", tabBarBadge: 3, headerTitle: "Home" }} />
        <Tab.Screen name={Constants.ContactTab} component={Contacts} options={{ tabBarLabel: "Contacts", tabBarBadge: 2, headerTitle: "Contacts"  }} />
        <Tab.Screen name={Constants.NotificationTab} 
                    component={Notification} 
                    options={{ 
                      tabBarLabel: "Notification", 
                      tabBarBadge: 5, 
                      headerTitle: "Notification",  
                    }} 
        />
        <Tab.Screen name={Constants.ReactNative}  component={ReactNative}  options={{ tabBarLabel: "React-Native", tabBarBadge: 1, headerTitle: "React Native Practice"  }} ></Tab.Screen>
        <Tab.Screen name={Constants.ProfileTab} params={{name: 'Huy'}}  component={Profile}  options={{ tabBarLabel: "Profile", tabBarBadge: 1, headerTitle: "Profile"  }} >
            {/*props => <ProfileStack.Screen name={Constants.GetHelp} component={GetHelp}  options={{ headerShown: false }}/>*/}
         
        </Tab.Screen>
      </Tab.Navigator>
    
  );
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
