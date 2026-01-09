import React from 'react'
import { View, ImageBackground, StyleSheet, Text, LayoutAnimation } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
function ContactHolder({userContactInfo, onPressInfo, index, isEditing, onSelectContact, onDeselectContact}) {
  const {id, name, phoneNumber} = userContactInfo
  const [isSelected, setSelected] = React.useState(false);
  //console.log(index)
  const onSelectDot = () => {
    isSelected ? onDeselectContact(id) : onSelectContact(id);
    setSelected(prev => !prev);
  }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
      <View style={[styles.item]} >
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
      {isEditing && <FontAwesome name={isSelected ? "circle" : "circle-o"} size={50} color="#000000ff" onPress={onSelectDot} />}
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
    flex: 1, // take up available space
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2ff',
    padding: 20,
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