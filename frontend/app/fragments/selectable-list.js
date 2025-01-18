import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';

export default function SelectableList({
    data,
    titleProperty,
    keyExtractorProperty,
    iconNameProperty,
    iconLibProperty,
    onSelectionCallbackProperty,
    underlayColor = "#333",
}) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item[keyExtractorProperty]}
            renderItem={({ item }) => (
                <TouchableHighlight
                    onPress={() => item[onSelectionCallbackProperty]()}
                    underlayColor={underlayColor}
                >
                    <ListItem bottomDivider>
                        <Icon name={item[iconNameProperty]} type={item[iconLibProperty]} />
                        <ListItem.Content>
                            <ListItem.Title>{item[titleProperty]}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableHighlight>
            )}
        />
    );
}
