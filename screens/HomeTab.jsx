import React, { useCallback } from 'react'
import { StyleSheet, Button, View, TouchableOpacity, Image, Text, FlatList, SafeAreaView, TouchableHighlight, Animated, TouchableWithoutFeedback } from "react-native";
import Constants from '../constants/Constants';
import { Feather, MaterialIcons } from '@expo/vector-icons' 
import axios from 'axios';
import FilterBottomSheet from '../components/FilterBottomSheet';

const BASE_URL = "https://www.freetogame.com/api"
const GAMES_URL = BASE_URL + "/games"

const fixed = [
    {
        "id": 582,
        "title": "Tarisland",
        "thumbnail": "https://www.freetogame.com/g/582/thumbnail.jpg",
        "short_description": "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
        "game_url": "https://www.freetogame.com/open/tarisland",
        "genre": "MMORPG",
        "platform": "PC (Windows)",
        "publisher": "Tencent",
        "developer": "Level Infinite",
        "release_date": "2024-06-22",
        "freetogame_profile_url": "https://www.freetogame.com/tarisland"
    },
    {
        "id": 540,
        "title": "Overwatch 2",
        "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
        "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
        "game_url": "https://www.freetogame.com/open/overwatch-2",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "Activision Blizzard",
        "developer": "Blizzard Entertainment",
        "release_date": "2022-10-04",
        "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
    },
    {
        "id": 516,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },
    {
        "id": 517,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },{
        "id": 518,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },{
        "id": 519,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },{
        "id": 520,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },
]

const sortByList = [
    { renderName: 'Newest to oldest', value: 'release-date' },
    { renderName: 'Popularity', value: 'popularity' },
    { renderName: 'Alphabetical', value: 'alphabetical' },
    { renderName: 'Relevance', value: 'relevance' }
]
export default function HomeTab({ navigation }) {
    const sheetRef = React.useRef(null);
    const [games, setGames] = React.useState(fixed)
    const [sortUpState, setSortUpStateState] = React.useState({sortByItem: { renderName: null, value: null }, isUp: true})
    const [filters, setFilters] = React.useState({selectedPlatform: "all", selectedGenres: []})
    const rotateAnim = React.useRef(new Animated.Value(0)).current

    const {sortByItem, isUp} = sortUpState
    const { renderName, value } = sortByItem
    const { selectedPlatform, selectedGenres } = filters
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={{
                backgroundColor: "#d4d4d4ff",
                borderRadius: 12,
                marginBottom: 16,
                padding: 20,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
                elevation: 3,
                overflow: "hidden",
            }}
            onPress={() => console.log("Open game:", item.game_url)}
            >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );
    const rotateArrow = (isUp) => {
        // toggle state and animate rotation
        const toValue = isUp ? 1 : 0
        Animated.timing(rotateAnim, { toValue, duration: 100, useNativeDriver: true }).start()
    }
    const onFilter = () => {
        sheetRef.current?.present()
    }
    const onSortBy = () => {
        rotateArrow(isUp)
        setSortUpStateState({...sortUpState, isUp: !isUp})
    }

    const onFiltersResult = useCallback(({selectedPlatform, selectedGenres}) => {
        setFilters({selectedPlatform, selectedGenres})
    }, []);

   
    React.useEffect(() => {
        //axios.get(GAMES_URL).then((res) => {setGames(res.data)}).catch(err => console.log(err))
        //const query = value ? `sort-by=${value}`.toLowerCase() : ''
        const queryParams = {
            "sort-by" : value ? value.toLowerCase() : '',
            "platform" : filters.selectedPlatform ? filters.selectedPlatform.toLowerCase() : 'all',
            "tag" : filters.selectedGenres.length > 0 ? filters.selectedGenres.join('.') : ''
        }
        axios.get(GAMES_URL, { params: queryParams }).then((res) => {setGames(res.data)}).catch(err => console.log(err))
    },[value, selectedPlatform, selectedGenres])
    
    //console.log(games)
    console.log(sortByItem, isUp)
    console.log("Filters applied:", filters.selectedPlatform, filters.selectedGenres);

    const filterItems = []
    selectedPlatform && selectedPlatform !== "all" ? filterItems.push(selectedPlatform) : null
    selectedGenres.length > 0 ? filterItems.push(...selectedGenres) : null

    const FilterBoxes = React.useMemo(() => filterItems.map((item, i) => (
        <TouchableWithoutFeedback key={i}>
            <View style={[styles.filter_box, {flexDirection: "row", alignItems: "center", gap: 6}]}>
                <Text style={styles.filter_box_text}>{item}</Text>
                <MaterialIcons name='close' size={18} color="#fafafaff" onPress={() => {
                    if (item === selectedPlatform) {
                        setFilters({...filters, selectedPlatform: null})
                    } else {
                        const filteredGenres = selectedGenres.filter(genre => genre !== item)
                        setFilters({...filters, selectedGenres: filteredGenres})
                    }
                }}/>
            </View>
        </TouchableWithoutFeedback>
    )), [filterItems]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
                    Featured Games
                </Text>
                <View style={{ paddingVertical: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableHighlight style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }} onPress={onFilter} underlayColor="#d4d4d4ff">
                        <View style={{ flexDirection: "row",alignItems: "center",}}>
                            <Text style={{ fontSize: 15 }}>Filter  </Text>
                            <Feather name="filter" size={20}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{ paddingHorizontal: 12, borderRadius: 8 }} onPress={onSortBy} underlayColor="#d4d4d4ff">
                        <View style={{ flexDirection: "row",alignItems: "center",}}>
                            <Text style={{ fontSize: 15 }}>{renderName ? renderName : "Sort By"} </Text>
                            <Animated.View style={{ transform: [{ rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
                                <MaterialIcons name="keyboard-arrow-up" size={24}/>
                            </Animated.View>
                        </View>
                    </TouchableHighlight>
                    {!isUp && <View style={{ position: "absolute", top: 50, right: 0, padding: 10, backgroundColor: "#fed2d2ff", shadowColor: '#000',
                                    shadowOffset: {width: 0, height: 2},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 4, zIndex: 100}}>
                                    <FlatList 
                                        data={sortByList} 
                                        keyExtractor={(item, index) => index.toString()} 
                                        renderItem={({item, index}) => (
                                            <TouchableOpacity style={{ paddingVertical: 6 }} onPress={() => {
                                                rotateArrow(isUp)
                                                setSortUpStateState({...sortUpState, sortByItem: item, isUp: !isUp})
                                                
                                            }}>
                                                <Text>{item.renderName}</Text>
                                            </TouchableOpacity>
                                        )}
                                        scrollEnabled={false}
                                    />
                                </View>
                    }
                </View>
                <View style={styles.filter_layout}>{FilterBoxes}</View>
                {games && <FlatList 
                    data={games} 
                    keyExtractor={item => item.id} 
                    renderItem={renderItem} 
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent = {() => <View style={{ height: 50 }} />}
                    />}
            </View>
            <FilterBottomSheet sheetRef={sheetRef} onFilters={onFiltersResult} remainingFilterItems={{platform: selectedPlatform, genres: selectedGenres}} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    filter_layout: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        paddingBottom: 20,    
        paddingHorizontal: 10,
    },
    filter_box: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#2a2a2aff",
        borderRadius: 10,
    },
    filter_box_text: {
        color: "#fff",
        fontWeight: "bold"
    },
});
 /*<View style={{ padding: 12 }}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={{ width: "100%", height: 180 }}
                    resizeMode="cover"
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
                {item.title}
                </Text>
                <Text
                    style={{ fontSize: 14, color: "#666", marginBottom: 6 }}
                    numberOfLines={2}
                >
                {item.short_description}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 4,
                    }}
                >
                    <Text style={{ fontSize: 12, color: "#999" }}>{item.genre}</Text>
                    <Text style={{ fontSize: 12, color: "#999" }}>{item.release_date}</Text>
                </View>
            </View> */
    /*
    const onLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ sortByItem: Constants.Logout }],
        });
    }
      
    <View style={ {paddingBottom: 100}}>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate(Constants.ProfileTab, {sortByItem: 'Huy'})}
            />

            <Button 
                title="Log out"
                onPress={onLogout}
            />
            
        </View> */
