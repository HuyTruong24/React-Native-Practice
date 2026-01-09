import React, { useCallback } from 'react'
import { View, Text, RefreshControl, Alert, FlatList, StyleSheet, ImageBackground, Animated, LayoutAnimation, Platform, UIManager } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons'
import MyBottomSheet from '../components/MyBottomSheet'

import ContactHolder from '../components/ContactHolder'
const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'abc',  
    phoneNumber: '123-456-7890'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'def', 
    phoneNumber: '123-456-7890'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'ghi', 
    phoneNumber: '123-456-7890'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d89',
    name: 'klm', 
    phoneNumber: '123-456-7890'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d01',
    name: 'opq', 
    phoneNumber: '123-456-7890'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d02',
    name: 'zpq', 
    phoneNumber: '123-456-7890'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d03',
    name: 'tpq', 
    phoneNumber: '123-456-7890'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d04',
    name: 'ypq', 
    phoneNumber: '123-456-7890'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d05',
    name: 'opq', 
    phoneNumber: '123-456-7890'
  },
]
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
function Contacts(props) {
  const tabBarHeight = props.route.params?.tabBarHeight || 500;
  const sheetRef = React.useRef(null);
  const [contacts, setContacts] = React.useState(data);
  const [userContactInfo , setUserContactInfo] = React.useState({})
  const [refreshing, setRefreshing] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedContacts, setSelectedContacts] = React.useState([]);

  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setContacts(data);
      setIsEditing(false);
      setSelectedContacts([]);
    }, 2000);
  }, [])

  const onPressInfo = (index) => {
    //console.log("Index:" + index)
    //console.log(data[index])
   // Alert.alert('Info button pressed');
   sheetRef.current?.present()
   setIsOpen(true);
   setUserContactInfo(data[index])
  };

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, []);
  const onDismiss = useCallback(() => {
    setIsOpen(false)
  }, []);

  const onEditIcon = () => {
    LayoutAnimation.configureNext({
      duration: 5000,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 0.4},
      delete: {type: 'linear', property: 'opacity'},
    });
    if (isEditing) {
      setContacts(prevContacts => 
        prevContacts.filter(contact => !selectedContacts.includes(contact.id))
      );
      setSelectedContacts([]);
    }
    setIsEditing(prev => !prev);
  }

  const onSelectContact = (contactId) => {
    setSelectedContacts(prev => [...prev, contactId]);
  }

  const onDeselectContact = (contactId) => {
    setSelectedContacts(prev => prev.filter(id => id !== contactId));
  }

  /*const Item = ({name, phoneNumber}) => (
    <View style={styles.item}>
      <ImageBackground style={styles.userLogo}>
        <Text style={styles.textLogo}>{name.at(0).toUpperCase()}</Text>
      </ImageBackground>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.number}>{phoneNumber}</Text>
      </View>
      <View style={styles.info}>
        <MaterialCommunityIcons name="information-outline" size={30} color="blue" onPress={onPressInfo} />
      </View>
    </View>
  );*/
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: isOpen ? "#fff" : "#fff"}]}>
        <FlatList
          data={contacts}
          renderItem={({item, index}) => (
            <ContactHolder 
              userContactInfo={{id: item.id, name: item.name, phoneNumber: item.phoneNumber}} 
              onPressInfo={onPressInfo} 
              index={index} 
              isEditing={isEditing} 
              onSelectContact={onSelectContact} 
              onDeselectContact={onDeselectContact}
            />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <Text style={styles.recents}>Recents</Text>
              <MaterialIcons name={isEditing ? "done" : "mode-edit"} size={30} color="#ff1d1dff" style={{marginRight: 30}} onPress={onEditIcon}/>
            </View>
          }
          ListFooterComponent={<View style={{height: tabBarHeight}} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />

        <MyBottomSheet sheetRef={sheetRef} userContactInfo={userContactInfo} onClose={onClose} onDismiss={onDismiss}/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16
  },
  recents: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    marginVertical: 10,
    marginLeft: 16
  },
});
export default Contacts