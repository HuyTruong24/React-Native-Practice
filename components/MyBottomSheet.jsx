import React from 'react'
import { View, Text , StyleSheet, ImageBackground, TouchableHighlight, Alert} from 'react-native'
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop} from '@gorhom/bottom-sheet'
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons'
import ContactButton from './ContactButton'
function MyBottomSheet(props) {
  const {sheetRef, userContactInfo, onClose, onDismiss} = props
  console.log(userContactInfo)
  const { id, name, phoneNumber } = userContactInfo
  const snapPoints = ['40%', '80%'];


  const renderBackdrop = React.useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        opacity={0.7}
        pressBehavior="close" //pressing backdrop will close the sheet
        disappearsOnIndex={-1} //back drop will dissapear when sheet is off the screen
			/>
		),
		[]
	);
  return (
    <BottomSheetModal 
      ref={sheetRef} 
      index={1} 
      snapPoints={snapPoints} 
      enablePanDownToClose={true}  //allow closing by pulling the sheet down
      backdropComponent={renderBackdrop}
      onClose={onClose} 
      onDismiss={onDismiss} >
        <BottomSheetView style={styles.bottomSheetView}>
            {/*<Text style={{textAlign: 'center', marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
            <Text style={{textAlign: 'center', marginVertical: 10}}>{phoneNumber}</Text>*/}
            <View style={styles.box} >
              <ImageBackground style={styles.userLogo}>
                {name && <Text style={styles.textLogo}>{name.at(0).toUpperCase()}</Text>}
              </ImageBackground>
              <Text style={styles.number}>{phoneNumber}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <ContactButton 
                buttonName="message" 
                iconComponent={ <Entypo name='message' size={30}/> } 
                onPress={() => Alert.alert('Message Pressed!')}/>
              <ContactButton 
                buttonName="call" 
                iconComponent={ <MaterialIcons name='call' size={30}/> } 
                onPress={() => Alert.alert('Call Pressed!')}/>
              <ContactButton 
                buttonName="video" 
                iconComponent={ <MaterialCommunityIcons name='video' size={30}/> } 
                onPress={() => Alert.alert('Video Pressed!')}/>
            </View>
        </BottomSheetView>
    </BottomSheetModal>
  )
}
const styles = StyleSheet.create({
  bottomSheetView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  box: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#f2f2f2ff',
    padding: 20,
  },
  userLogo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#313131ff',
    width: 80, 
    height: 80, 
    borderRadius: 25, 
  },
  textLogo: {
    color: '#ffffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  number: {
    color: 'black',
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 15
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginVertical: 15
  },
  
});
export default MyBottomSheet