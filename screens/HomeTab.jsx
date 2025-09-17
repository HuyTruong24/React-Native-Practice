import React from 'react'
import { Button, View } from "react-native";
import Constants from '../constants/Constants';

export default function HomeTab({ navigation }) {
    const onLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: Constants.Logout }],
        });
    }
   return (
        <View style={ {paddingBottom: 100}}>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate(Constants.ProfileTab, {name: 'Huy'})}
            />

            <Button 
                title="Log out"
                onPress={onLogout}
            />
        </View>
    );
}
