import React from 'react';
import { StyleSheet, View } from 'react-native';
import SelectableList from '../fragments/selectable-list';
import { useNavigation } from '@react-navigation/native';

export default function More() {
    const { navigate } = useNavigation();

    const MORE_OPTIONS = [
        { id: 'm1', title: 'Settings', iconName: 'settings', iconLib: 'feather', callback: () => navigate('Settings') },
        { id: 'm2', title: 'Profile', iconName: 'user', iconLib: 'feather', callback: () => console.log("Selected Profile") },
        { id: 'm3', title: 'Help', iconName: 'help-circle', iconLib: 'feather', callback: () => console.log("Selected Help") },
    ];

    return (
        <View>
            <SelectableList
                data={MORE_OPTIONS}
                titleProperty="title"
                keyExtractorProperty="id"
                iconNameProperty="iconName"
                iconLibProperty="iconLib"
                onSelectionCallbackProperty="callback"
                underlayColor="#ccc"
            />
        </View>
    );
}