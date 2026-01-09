import React from 'react'
import { StyleSheet, Text, View, SectionList, StatusBar  } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Divider from '../components/Divider';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];
const emptyList = []
function ReactNative() {
  const bottomTabHeight = useBottomTabBarHeight()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, section, separators}) => {
            console.log(item)
            console.log(section)
            console.log("\n")
 
            return <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          }}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}

          stickySectionHeadersEnabled={true} //by default this is true
          ItemSeparatorComponent={Divider} //or ItemSeparatorComponent={() => <Divider />}
          SectionSeparatorComponent={() => <Divider color="#356effff"/>}
          ListEmptyComponent={() => <Text>No content here</Text>}

          ListFooterComponent={() => <View style={{height: bottomTabHeight}}></View>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
export default ReactNative