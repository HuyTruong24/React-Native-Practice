import React from 'react'
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
function ContactHolder({userContactInfo, onPressInfo, index}) {
  const {id, name, phoneNumber} = userContactInfo
  //console.log(index)
  return (
    <View style={styles.item} >
      <ImageBackground style={styles.userLogo}>
        <Text style={styles.textLogo}>{name.at(0).toUpperCase()}</Text>
      </ImageBackground>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>{phoneNumber}</Text>
      </View>
      <View style={styles.info}>
        <MaterialCommunityIcons name="information-outline" size={30} color="blue" onPress={() => onPressInfo(index)} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  userLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#313131ff',
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10,
  },
  textLogo: {
    color: '#ffffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2ff',
    padding: 20,
    marginHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  number: {
    color: 'gray',
    fontSize: 15,
  },

  info: { flex: 1, alignItems: 'flex-end' }
});
export default ContactHolder