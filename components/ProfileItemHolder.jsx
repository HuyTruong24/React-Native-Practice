import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

function ProfileItemHolder(props) {
    const {id, name, iconComponent, hasArrow = true, onClick} = props
  return (
    <TouchableHighlight 
        style={styles.card} 
        onPress={() => onClick(id)} 
        underlayColor={'#d5d5d5ff'} 
        activeOpacity={1}>
         <View style={styles.container}>
            {iconComponent}
            <Text style={styles.title}>{name}</Text>
            {hasArrow && <MaterialIcons name="keyboard-arrow-right" size={24}/>}
        </View>
    </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
    card: {
        height: 60,
        paddingHorizontal: 12,
        borderRadius: 15
    },
    container: {
        height: "100%" ,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        flex: 1,
        marginStart: 15,
        fontSize: 18
    }
})
export default ProfileItemHolder