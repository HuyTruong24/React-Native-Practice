import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Profile from "./screens/Profile";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import GetHelp from "./components/GetHelp";
import Constants from "./constants/Constants";
import { StackScreen } from "react-native-screens";
import Logout from "./screens/Logout";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Privacy from "./components/Privacy";
import LogoutTemp from "./screens/LogoutTemp";
import Main from "./screens/Home";

const Stack = createNativeStackNavigator();
const options = { headerShown: false };

function RootStack() {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name={Constants.Login} component={Login} />
      <Stack.Screen name={Constants.Registration} component={Registration} />
      <Stack.Screen name={Constants.Logout} component={LogoutTemp} />
      <Stack.Screen name={Constants.Main} component={Main} />
      <Stack.Screen
        name={Constants.GetHelp}
        component={GetHelp}
        options={{
          headerShown: true,
          headerLargeTitleShadowVisible: true,
          headerLargeTitleStyle: {
            fontFamily: "Georgia",
            fontSize: 22,
            fontWeight: "500",
            color: "blue",
          },
        }}
      />
      <Stack.Screen
        name={Constants.Privacy}
        component={Privacy}
        options={{
          headerShown: true,
          headerLargeTitleShadowVisible: true,
          headerLargeTitleStyle: {
            fontFamily: "Georgia",
            fontSize: 22,
            fontWeight: "500",
            color: "blue",
          },
        }}
      />
      {/*<Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />*/}
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <RootStack />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
