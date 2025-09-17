import React from 'react'
import { View } from 'react-native'

function Divider(props) {
    console.log(props)
    const {length, thickness, color, marginVertical} = props
  return (
    <View style={{
        height: thickness || 1,
        backgroundColor: color || "#ccc",
        marginVertical: marginVertical || 10
    }}></View>
  )
}

export default Divider