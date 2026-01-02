import React from 'react'
import { View, Text, RefreshControl, Alert, FlatList, StyleSheet, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { MaterialCommunityIcons } from '@expo/vector-icons'
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
function Contacts() {
  const sheetRef = React.useRef(null);
  const [userContactInfo , setUserContactInfo] = React.useState({})
  const [refreshing, setRefreshing] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
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

  const onClose = () => {
    setIsOpen(false)
  }
  const onDismiss = () => {
    setIsOpen(false)
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
          data={data}
          renderItem={({item, index}) => <ContactHolder userContactInfo={{id: item.id, name: item.name, phoneNumber: item.phoneNumber}} onPressInfo={onPressInfo} index={index}/>}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.recents}>Recents</Text>}
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