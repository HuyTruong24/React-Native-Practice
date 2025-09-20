import React, {useState} from 'react'
import { StyleSheet, Text, View, SectionList, StatusBar, Switch, ScrollView, TouchableHighlight  } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Divider from './Divider';
import CustomSwitch from './CustomSwitch';
import { MaterialIcons } from '@expo/vector-icons';

function Privacy() {
  const divider = <Divider marginVertical={40}/>
  const onValueChange = (state) => {
    setTimeout(() => {
      console.log(state)
    }, 10000);
  }

  const ReciptSection = () => {
    return <View>
            <Text style={styles.sectionHeader}>Read receipts</Text>
            <View style={styles.sectionContent}>
              <View style={styles.descriptionSection}>
                <Text style={styles.description}>Show people when i've read their messages. Learn more</Text>
              </View>
              <CustomSwitch  onValueChange={onValueChange}/>
            </View>
          </View>
  }
  const ListingSection = () => {
    return <View >
            <Text style={styles.sectionHeader}>Listings</Text>
            <View style={styles.sectionContent}>
              <View style={{...styles.descriptionSection, flexDirection: "column", alignItems: "flex-start"}}>
                <Text style={styles.description}>Include my listing(s) in search engines</Text>
                <Text style={styles.subDescription}>Turning this on means search engines, like Google, will display your listing page(s) in search results</Text>
              </View>
              <CustomSwitch  onValueChange={onValueChange}/>
            </View>
          </View>
  }
  const SubReviewSection = ({title, example}) => {
    return <View style={{...styles.sectionContent, marginBottom: 20}}>
            <View style={styles.descriptionSection}>
              <Text style={styles.description}>{title}</Text>
              <Text style={styles.subDescription}>{example}</Text>
            </View>
            <CustomSwitch  onValueChange={onValueChange}/>
          </View>
  }
  const ReviewSection = () => {
    return <View >
            <Text style={{...styles.sectionHeader, marginBottom:0}}>Reviews</Text>
            <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
              <Text style={{...styles.subDescription, marginBottom: 40}}>Choose what's shared when you write a review. Updating this setting will affect both past and future reviews.</Text>
              <SubReviewSection title="Show my home city and country" example="Ex: City and country"/>
              <SubReviewSection title="Show my trip type" example="Ex: Stayed with kids or pets"/>
              <SubReviewSection title="Show my length of stay" example="Ex: A few nights, about a week, etc."/>
              <SubReviewSection title="Show my booked services" example="Ex: SGourmet brunch or tasting menu"/>
            </View>
          </View>
  }
  const DataPrivacyCard = ({name}) => {
    return <TouchableHighlight 
              style={styles.card} 
              onPress={() => {}}
              underlayColor='#e2e2e2c0'
              activeOpacity={1}>
              <View style={styles.cardContainer}>
                  <Text style={styles.title}>{name}</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24}/>
              </View>
            </TouchableHighlight>
  }
  const DataPrivacySection = () => {
    return <View style={{marginBottom: 30}}>
            <Text style={{...styles.sectionHeader, marginBottom: 20}}>Data Privacy</Text>
            <View style={{ flexDirection: "column"}}>
              <DataPrivacyCard name="Request my personal data"/>
              <DataPrivacyCard name="Third-party tools"/>
              <DataPrivacyCard name="Delete my account"/>
            </View>
          </View>
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} >
        <ScrollView style={styles.scrollViewLayout} contentInsetAdjustmentBehavior="automatic" stickyHeaderHiddenOnScroll={true}>
          <Text style={styles.screenDesc}>Control how your information is used and shared with others on MyApp</Text>
          <ReciptSection />
          {divider}
          <ListingSection />
          {divider}
          <ReviewSection />
          {divider}
          <DataPrivacySection />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollViewLayout: {
    paddingHorizontal: 16
  },
  screenDesc: {
    fontSize: 18,
    color: "gray",
    marginVertical: 20
  },
  section: {
    flexDirection: "column"
  },
  sectionHeader: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20
  },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  descriptionSection: {
    flex: 1
  },
  description: {
    fontSize: 18,
    fontWeight: "bold"
  },
  subDescription: {
     fontSize: 16,
     color: "gray",
     marginVertical: 8
  },

  card: {
    paddingVertical: 25,
    paddingHorizontal: 12,
    marginVertical: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15
  },
  cardContainer: {
      flexDirection: "row",
      alignItems: "center",
  },
  title: {
      flex: 1,
      fontSize: 18
  }
});
export default Privacy