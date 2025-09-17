import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
function ContactButton(props) {
    const {buttonName, iconComponent, onPress} = props

    const touchableHighlightProps = {
        activeOpacity: 0.6,
        underlayColor: "#a3a3a3ff",
        onPress: () => onPress()
      }
  return (
    <TouchableHighlight {...touchableHighlightProps} style={styles.touchableHighlight} /*second option for onPress:  onPress={onPress} */>
        <View style={styles.touchableHighlightView}>
            {iconComponent}
            <Text>{buttonName}</Text>
        </View>
    </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
  touchableHighlight: {
    backgroundColor: '#8aafffaf',
    borderRadius: 10,
    paddingVertical: 10,
    width: 100
  },
  touchableHighlightView: {
    flexDirection: "column",
    alignItems: "center"
  }
})
export default ContactButton