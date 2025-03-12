import React from 'react';

import { Icon } from '@rneui/base';
import { ListItem } from '@rneui/base';
import { useThemeToggle } from '../hooks/theme-service';
import { TouchableHighlight } from 'react-native';
import { FlatList, Switch, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Text } from 'react-native';


export default function Settings() {

    const { isDark, toggleTheme } = useThemeToggle();
    const { colors } = useTheme();
    const navigation = useNavigation();

    const SETTINGS = [
        {
            id: 's1',
            title: 'About',
            iconName: 'info',
            iconLib: 'feather',
            callback: () => navigation.navigate("About")
        },
        {
            id: 's2',
            title: 'Privacy Policy',
            iconName: 'shield',
            iconLib: 'feather',
            callback: () => navigation.navigate("PrivacyPolicy")
        },
        {
            id: 's3',
            title: 'Terms and Conditions',
            iconName: 'file-text',
            iconLib: 'feather',
            callback: () => navigation.navigate("TermsAndConditions")
        },
    ];

    return (
        <View>
            <FlatList
                data={SETTINGS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableHighlight
                        onPress={() => item.callback()}
                        underlayColor={colors.highlight}
                    >
                        <ListItem bottomDivider containerStyle={{ backgroundColor: colors.card }}>
                            <Icon name={item.iconName} type={item.iconLib} color={colors.text} />
                            <ListItem.Content>
                                <ListItem.Title style={{ color: colors.text }}>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron color={colors.text} />
                        </ListItem>
                    </TouchableHighlight>
                )}
            />
            <View style={{ margin: 16 }}>
                <Text style={{ fontSize: 16, color: colors.text }}>Appearance</Text>
            </View>
            <ListItem containerStyle={{ backgroundColor: colors.card }}>
                <Icon name="sun" type="feather" color={colors.text} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.text }}>Toggle Theme</ListItem.Title>
                </ListItem.Content>
                <Switch
                    ios_backgroundColor={colors.switchBackground}
                    onValueChange={toggleTheme}
                    value={isDark}
                />
            </ListItem>
        </View>
    );
}


