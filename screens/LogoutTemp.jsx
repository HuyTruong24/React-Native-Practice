import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import Constants from '../constants/Constants'
Text
function LogoutTemp(props) {
    console.log(props)
    const {navigation} = props

    const onLoginAgain = () => navigation.replace(Constants.Login)
  return (
    <View style={styles.container}>
        <Text>Your session has expired. Please log in again</Text>
        <Pressable style={styles.pressable}  onPress={onLoginAgain}> 
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
        backgroundColor: '#9a9a9aff',
    },

    pressable: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
    }
});
export default LogoutTemp