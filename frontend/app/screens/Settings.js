import React from 'react';

import { FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { ListItem } from '@rneui/base';
import { Icon } from '@rneui/base';


export default function Settings() {

    const SETTINGS = [
        {
            id: 's1',
            title: 'About',
            iconName: 'info',
            iconLib: 'feather',
            callback: () => console.log('Selected: About')
        },
        {
            id: 's2',
            title: 'Privacy Policy',
            iconName: 'shield',
            iconLib: 'feather',
            callback: () => console.log('Selected: Privacy Policy')
        },
        {
            id: 's3',
            title: 'Terms and Conditions',
            iconName: 'file-text',
            iconLib: 'feather',
            callback: () => console.log('Selected: Terms and Conditions')
        },
    ];

    return (
        <FlatList
            data={SETTINGS}
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


