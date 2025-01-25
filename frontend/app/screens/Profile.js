import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { ListItem } from '@rneui/base';
import { Icon } from '@rneui/base';


export default function Profile() {
    const PROFILE_OPTIONS = [
        {
            id: 'm1',
            title: 'Settings',
            iconName: 'settings',
            iconLib: 'feather',
            callback: () => console.log("Selected Settings")
        },
        {
            id: 'm2',
            title: 'Profile',
            iconName: 'user',
            iconLib: 'feather',
            callback: () => console.log("Selected Profile")
        },
        {
            id: 'm3',
            title: 'Help',
            iconName: 'help-circle',
            iconLib: 'feather',
            callback: () => console.log("Selected Help")
        },
    ];

    return (
        <FlatList
            data={PROFILE_OPTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableHighlight
                    onPress={() => item.callback()}
                    underlayColor="#333"
                >
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