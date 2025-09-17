import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Constants from "../constants/Constants";
export default function Login() {
    const navigate = useNavigation();
    const [emailValue, onChangeText] = useState("");
    const [passwordValue, onChangePassword] = useState("");
  
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  
    return (
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView>
          <Image
            blurRadius={10}
            fadeDuration={2000}
            source={{
              uri: "https://fastly.picsum.photos/id/1006/200/200.jpg?hmac=yv53p45TOMz8bY4ZXUVRMFMO0_6d5vGuoWtE2hJhxlc",
              width: 200,
              height: 200,
            }}
          />
          <Text style={styles.text} numberOfLines={1}>Welcome to my app</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={emailValue}
            onChangeText={onChangeText}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            keyboardType="visible-password"
            value={passwordValue}
            onChangeText={onChangePassword}
            secureTextEntry={true}
          />
  
          <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Switch
              trackColor={{ false: "#767577", true: "#00c31aff" }}
              thumbColor={isEnabled ? "#1e1e1eff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Button
            title="Log in"
            onPress={() => {
              navigate.replace(Constants.Home) //remove login scrren from the stack and navigate to home screen
            }}
            color="#d2d2d2ff"
            accessibilityLabel="Learn more about this button"
          />
            {
              /*Alert.alert("Invalid credentials", "Fuck off", [
                {
                  text: "OK",
                },
                {
                  text: "Sure", 
                },
              ])*/
            }
        
          <Button
              title="Don't have account? Sign up"
              color="#2aa6ffff"
              onPress={() => navigate.navigate(Constants.Registration)}
          />
          <StatusBar style="dark" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2d2d2dba",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "#ffffffff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    color: "#fff",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});