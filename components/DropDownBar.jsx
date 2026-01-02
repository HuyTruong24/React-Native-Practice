import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight,TouchableOpacity, Animated } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
const Directions = {
  UP: true,
  DOWN: false,
};
function DropDownBar({name, children}) {
    const [direction, setDirection] = React.useState(Directions.UP)
    const rotateAnim = React.useRef(new Animated.Value(0)).current
    const touchableHighlightProps = (isUp) => ({
        underlayColor: "#d4d4d4ff",
        onPress: () => {
            Animated.timing(rotateAnim, {
                toValue: isUp ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
            setDirection((prev) => !prev)
        }
    })
    console.log(name)
  return (
    <>
        <TouchableHighlight style={styles.section} {...touchableHighlightProps(direction)}>
            <View style={styles.sectionLayout}>
                <Text style={styles.sectionText}>{name}</Text>
                <Animated.View style={{ transform: [{ rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
                    <MaterialIcons name="keyboard-arrow-up" size={24}/>
                </Animated.View>
            </View>
        </TouchableHighlight>
        {direction === Directions.DOWN && children}
    </>
  )
}
const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 
    },
    sectionLayout: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    },
    sectionText: {
        fontSize: 18,
        fontWeight: "bold"
    },
})
export default DropDownBar