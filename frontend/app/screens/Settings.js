import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';

const sampleCallback = console.log('Selected');
const SETTINGS = [
    { id: 's1', title: 'About', iconName: 'info', iconLib: 'feather', callback: sampleCallback },
    { id: 's2', title: 'Privacy Policy', iconName: 'shield', iconLib: 'feather', callback: sampleCallback },
    { id: 's3', title: 'Terms and Conditions', iconName: 'file-text', iconLib: 'feather', callback: sampleCallback },
];

export default function Settings() {
    return (
        <FlatList
            data={SETTINGS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableHighlight onPress={() => { console.log() }} underlayColor="#333">
                    <ListItem bottomDivider>
                        <Icon name={item.iconName} type={item.iconLib} />
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableHighlight>
            )}
        />
    );
}
