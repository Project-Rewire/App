import React from 'react';
import { useAuth } from '../hooks/jwt-auth-service';

import { Icon } from '@rneui/base';
import { ListItem } from '@rneui/base';
import { useThemeToggle } from '../hooks/theme-service';
import { TouchableHighlight } from 'react-native';
import { FlatList, Switch, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { H1, H2 } from '../fragments/heading';


export default function Settings() {

    const { logout } = useAuth
    const { isDark, toggleTheme } = useThemeToggle();
    const { colors } = useTheme();
    const navigation = useNavigation();

    
    const handleLogout = async () => {
        await logout();
    };

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
        {
            id: 's4',
            title: 'Logout',
            iconName: 'log-out',
            iconLib: 'feather',
            callback: handleLogout
        },
    ];

    return (
        <View>
            <H1>Settings</H1>
            <H2>General</H2>
            <FlatList
                data={SETTINGS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableHighlight
                        onPress={() => item.callback()}
                        underlayColor={colors.highlight}
                    >
                        <ListItem bottomDivider containerStyle={{ backgroundColor: colors.card, borderColor: colors.border }}>
                            <Icon name={item.iconName} type={item.iconLib} color={colors.text} />
                            <ListItem.Content>
                                <ListItem.Title style={{ color: colors.text }}>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron color={colors.text} />
                        </ListItem>
                    </TouchableHighlight>
                )}
            />
            <H2>Appearance</H2>
            <ListItem containerStyle={{ backgroundColor: colors.card }}>
                <Icon name="moon" type="feather" color={colors.text} />
                <ListItem.Content>
                    <ListItem.Title style={{ color: colors.text }}>Dark Theme</ListItem.Title>
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



