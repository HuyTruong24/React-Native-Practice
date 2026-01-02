import BottomSheet, { BottomSheetModal, BottomSheetView, BottomSheetBackdrop} from '@gorhom/bottom-sheet'
import React, { useCallback } from 'react'
import { View, StyleSheet, Text, TouchableHighlight,TouchableOpacity, Animated } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import Divider from './Divider'
import DropDownBar from './DropDownBar'

const genres = [
  "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social",
  "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel",
  "zombie", "turn-based", "first-person", "third-person", "top-down",
  "tank", "space", "sailing", "side-scroller", "superhero", "permadeath",
  "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime",
  "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military",
  "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"
];
const platforms = [
  "all", "pc", "browser"
];
function FilterBottomSheet(props) {
  const {sheetRef, onFilters} = props
  const snapPoints = ['60%', '90%'];

  const [selectedPlatform, setSelectedPlatform] = React.useState('all');
  const [selectedGenres, setSelectedGenres] = React.useState([]);
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

  const divider = React.useMemo(() => <Divider thickness={2}/>, []);
  
  const onPlatformSelect = (item) => {
    setSelectedPlatform(item);
  }
 
  const onGenreSelect = (item) => {
    setSelectedGenres(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)    // unselect
        : [...prev, item]                 // select
    );
  };
  const onClearAll = () => {
    sheetRef.current?.close();
    setSelectedPlatform('all');
    setSelectedGenres([]);
  };
  const onApplyFilters = () => {
    // Implement filter application logic here
    sheetRef.current?.close();
    onFilters({selectedPlatform, selectedGenres});
  }

  const PlatformBoxes = platforms.map((item, i) => {
    const isSelected = item === selectedPlatform;
    return (
      <TouchableOpacity style={[styles.box, isSelected && styles.selectedBox]} key={i} onPress={() => onPlatformSelect(item)}>
        <Text style={[styles.text, isSelected && styles.selectedText]}>{item}</Text>
      </TouchableOpacity>
    )
  })

 
  const GenreBoxes = genres.map((item, i) => {
    const isSelected = selectedGenres.includes(item);
    return (
      <TouchableOpacity style={[styles.box, isSelected && styles.selectedBox]} key={i} onPress={() => onGenreSelect(item)}>
        <Text style={[styles.text, isSelected && styles.selectedText]}>{item}</Text>
      </TouchableOpacity>
    )
  })
  
 
  return (
    <BottomSheetModal
      ref={sheetRef} 
      index={1} 
      snapPoints={snapPoints} 
      enablePanDownToClose={true}  //allow closing by pulling the sheet down
      backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.bottomSheetView}>
          <DropDownBar name="Platform" children={<View style={styles.category_container}>{PlatformBoxes}</View>}/>
          {divider}
          <DropDownBar name="Category" children={<View style={styles.category_container}>{GenreBoxes}</View>}/>
          {divider}
          <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 10}}>
              <TouchableHighlight style={{backgroundColor: "transparent", borderRadius: 8, borderWidth: 1, borderColor: 'black',}} onPress={onClearAll} underlayColor="#d4d4d4ff">
                <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, gap: 5}}>
                  <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Clear All</Text>
                  <MaterialIcons name='clear' size={20} color='black'/>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{backgroundColor: "#4B7BEC", borderRadius: 8,}} onPress={onApplyFilters} underlayColor="#3a5bbdff">
                <View style={{alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10,}}>
                  <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>Apply Filters</Text>
                </View>
              </TouchableHighlight>
          </View>
          {/* Add more filter sections as needed */}
        </BottomSheetView>
    </BottomSheetModal>
  )
}
const styles = StyleSheet.create({
  bottomSheetView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  category_container: {
    flexDirection: "row",
    flexWrap: "wrap", //allow items to wrap naturally
    gap: 12,   
    paddingVertical: 5,    
    paddingHorizontal: 10,
  },
  box: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  selectedBox: {
    backgroundColor: "#4B7BEC",        // highlighted color
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  selectedText: {
    color: "white",
  }
})
export default FilterBottomSheet