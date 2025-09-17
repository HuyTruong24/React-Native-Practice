import React from 'react'
import { useNavigation } from "@react-navigation/native";
import Constants from "../constants/Constants";
import { Pressable, View, StyleSheet } from 'react-native'

export default function Logout() {
  //const navigation = useNavigation();

  /*onPress={() => {
                navigation.navigate(Constants.Login);
            }}  */
  
  return (
    <View style={styles.container}>
          <Text>Your session has expired. Please log in again</Text>
          <Pressable style={styles.pressable}  > 
              <Text>Log in again</Text>
          </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#313131ff',
    },

    pressable: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
    }
})
