import React from 'react';
import SelectableList from '../fragments/selectable-list';

const SETTINGS = [
    { id: 's1', title: 'About', iconName: 'info', iconLib: 'feather', callback: () => console.log('Selected: About') },
    { id: 's2', title: 'Privacy Policy', iconName: 'shield', iconLib: 'feather', callback: () => console.log('Selected: Privacy Policy') },
    { id: 's3', title: 'Terms and Conditions', iconName: 'file-text', iconLib: 'feather', callback: () => console.log('Selected: Terms and Conditions') },
];

export default function Settings() {

    return (
        <SelectableList
            data={SETTINGS}
            titleProperty="title"
            keyExtractorProperty="id"
            iconNameProperty="iconName"
            iconLibProperty="iconLib"
            onSelectionCallbackProperty="callback"
            underlayColor="#333"
        />
    );
}
